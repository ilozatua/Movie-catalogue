import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import {
  MovieBody,
  MovieListItem,
  MovieResult,
  MovieWithId,
} from '../catalogue.model';
import { FireApiService, MovieApiService } from '../services';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies$: Observable<MovieListItem[]>;

  constructor(
    private fireApiService: FireApiService,
    private movieApiService: MovieApiService,
    private loadingService: LoadingService
  ) {}

  private mapMovieData(data: MovieWithId[]) {
    return data.map((d) =>
      this.movieApiService.getMovieByImdbId(d.imdbId).pipe(
        map<MovieResult, MovieListItem>((movie) => ({
          data: d,
          movie,
        }))
      )
    );
  }

  ngOnInit() {
    this.loadingService.start();
    this.movies$ = this.fireApiService.getMovies().pipe(
      switchMap((data) => forkJoin(this.mapMovieData(data))),
      finalize(() => this.loadingService.stop())
    );
  }
}
