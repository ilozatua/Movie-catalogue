import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { EventBusService } from 'src/app/services/event-bus.service';
import { LoadingService } from 'src/app/services/loading.service';
import {
  Country,
  EventBusEvent,
  Movie,
  MovieBody,
  MovieResult,
} from '../catalogue.model';
import { FireApiService, MovieApiService } from '../services';
import { AddMovieStorage } from './add-movie.storage';

@Injectable()
export class AddMovieFacade {
  searchKey: string;
  hasError: boolean;

  get lastThreeSearches(): string[] {
    return this.addMovieStorage.lastThreeSearches;
  }

  submitted = false;

  private _selectedMovie: Movie;
  get selectedMovie(): Movie {
    return this._selectedMovie;
  }

  constructor(
    private loadingServce: LoadingService,
    private movieApiService: MovieApiService,
    private addMovieStorage: AddMovieStorage,
    private fireApiService: FireApiService,
    private eventBusService: EventBusService
  ) {}

  getCountryFlag(code: string): string {
    return `https://www.countryflags.io/${code}/shiny/64.png`;
  }

  getCountryPopulation(country: Country): string {
    return `Popultion of ${country.code}: ${country.population}`;
  }

  fetchMovie(name: string) {
    this.loadingServce.start();
    this.movieApiService
      .getMovieByName(name)
      .pipe(
        finalize(() => {
          this.loadingServce.stop();
          this.searchKey = '';
        }),
        switchMap((movie) => {
          const countries = movie?.Country?.split(', ');

          if (!countries) {
            return of(null);
          }

          return forkJoin(
            countries.map((code) => this.getCountryWithPopulation(code))
          ).pipe(
            map<Country[], Movie>((countries) =>
              this.mapMovie(movie, countries)
            )
          );
        })
      )
      .subscribe((movie) => (this._selectedMovie = movie));
  }

  search(key: string) {
    if (!key) {
      this.hasError = true;
      return;
    }

    this.hasError = false;

    this.addMovieStorage.addToLastSearches(key);
    this.fetchMovie(key);
  }

  private mapMovie(movie: MovieResult, countries: Country[]): Movie {
    return {
      actors: movie.Actors,
      countries,
      director: movie.Director,
      genre: movie.Genre.split(', '),
      imdbId: movie.imdbID,
      plot: movie.Plot,
      poster: movie.Poster,
      title: movie.Title,
      year: movie.Year,
    };
  }

  private getCountryWithPopulation(code: string): Observable<Country> {
    return this.movieApiService.getCountry(code).pipe(
      map((c) => {
        const country = c[0];

        return {
          code: country.alpha2Code,
          population: country.population,
        };
      }),
      catchError(() => {
        return of(null);
      })
    );
  }

  submit(body: MovieBody) {
    this.loadingServce.start();
    this.fireApiService
      .addMovie(body)
      .pipe(finalize(() => this.loadingServce.stop()))
      .subscribe(() => {
        this._selectedMovie = null;
        this.eventBusService.emit(EventBusEvent.ResetForm);
      });
  }

  restoreState() {
    this.addMovieStorage.restoreState();
  }
}
