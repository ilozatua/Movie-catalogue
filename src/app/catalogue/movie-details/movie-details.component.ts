import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import {
  MovieBody,
  MovieResult,
  STATUS,
  StatusForTranslate,
  WhenToWatchSelect,
  WHEN_TO_WATCH,
} from '../catalogue.model';
import { FireApiService, MovieApiService } from '../services';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  storeData$: Observable<MovieBody>;
  movieData$: Observable<MovieResult>;

  get statusTranslate(): StatusForTranslate[] {
    return STATUS;
  }

  get whenToWatch(): WhenToWatchSelect[] {
    return WHEN_TO_WATCH;
  }

  constructor(
    private activatedRouter: ActivatedRoute,
    private fireApiService: FireApiService,
    private movieApiService: MovieApiService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  private initMovieDetails() {
    const id = this.activatedRouter.snapshot.params['id'];
    this.loadingService.start();
    this.storeData$ = this.fireApiService
      .getMovie(id)
      .pipe(
        tap(
          (movie) =>
            (this.movieData$ = this.movieApiService
              .getMovieByImdbId(movie.imdbId)
              .pipe(finalize(() => this.loadingService.stop())))
        )
      );
  }

  goBack() {
    this.router.navigate(['catalogue']);
  }

  ngOnInit() {
    this.initMovieDetails();
  }
}
