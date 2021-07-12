import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import {
  MovieBody,
  Country,
  Movie,
  RATINGS,
  Status,
  WhenToWatch,
  WhenToWatchSelect,
  WHEN_TO_WATCH,
  EventBusEvent,
} from '../catalogue.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AddMovieFacade } from './add-movie.facade';
import { AddMovieStorage } from './add-movie.storage';
import { EventBusService } from 'src/app/services/event-bus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
  providers: [AddMovieFacade, AddMovieStorage],
})
export class AddMovieComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  get searchKey(): string {
    return this.facade.searchKey;
  }

  set searchKey(value: string) {
    this.facade.searchKey = value;
  }

  get hasError(): boolean {
    return this.facade.hasError;
  }

  form: FormGroup;

  status = Status;

  whenToWatchEnum = WhenToWatch;

  get whenToWatch(): WhenToWatchSelect[] {
    return WHEN_TO_WATCH;
  }

  get ratings(): number[] {
    return RATINGS;
  }

  submitted = false;

  get canWatchLater(): boolean {
    return !!this.form.get('whenToWatch');
  }

  get selectedMovie(): Movie {
    return this.facade.selectedMovie;
  }

  get lastThreeSearches(): string[] {
    return this.facade.lastThreeSearches;
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private facade: AddMovieFacade,
    private eventBusService: EventBusService,
    private router: Router
  ) {}

  private createForm() {
    this.form = this.fb.group({
      review: ['', [Validators.required, Validators.minLength(10)]],
      rating: 1,
      status: Status.Watched,
    });
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const value = this.form.value;

    const body: MovieBody = {
      imdbId: this.selectedMovie.imdbId,
      uid: this.auth.userId,
      rating: value.rating,
      review: value.review,
      status: value.status,
      whenToWatch: value.whenToWatch || '',
    };

    this.facade.submit(body);
    this.router.navigate(['catalogue']);
  }

  private reset() {
    this.form.reset();
    this.form.updateValueAndValidity();

    this.submitted = false;

    this.form.get('review').setValue('');
    this.form.get('rating').setValue(1);
    this.form.get('status').setValue(Status.Watched);

    this.translateService
      .get('catalogue.MOVIE_HAS_BEEN_ADDED')
      .subscribe((value) => this.toastr.success(value));
  }

  private addControlsByStatus(status: Status) {
    switch (status) {
      case Status.WatchLater:
        this.form.addControl(
          'whenToWatch',
          new FormControl(null, Validators.required)
        );
        break;
      case Status.Watched:
        this.form.removeControl('whenToWatch');
        break;
    }
  }

  search(key: string) {
    this.facade.search(key);
  }

  getCountryFlag(code: string): string {
    return this.facade.getCountryFlag(code);
  }

  getCountryPopulation(country: Country): string {
    return this.facade.getCountryPopulation(country);
  }

  fetchMovie(name: string) {
    this.facade.fetchMovie(name);
  }

  goBack() {}

  ngOnInit() {
    this.facade.restoreState();
    this.createForm();

    this.form
      .get('status')
      .valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((status) => this.addControlsByStatus(status));

    this.eventBusService
      .on(EventBusEvent.ResetForm)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.reset());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
