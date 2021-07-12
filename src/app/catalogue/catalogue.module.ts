import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatalogueComponent } from './catalogue.component';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { SharedModule } from '../shared/shared.module';
import { environment } from 'src/environments/environment';
import { MovieListComponent, MovieListItemComponent } from './movie-list';
import { FireApiService, MovieApiService, MOVIE_BASE_URL } from './services';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

@NgModule({
  declarations: [
    CatalogueComponent,
    AddMovieComponent,
    MovieListComponent,
    MovieListItemComponent,
    MovieDetailsComponent,
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    MovieApiService,
    FireApiService,
    {
      provide: MOVIE_BASE_URL,
      useValue: environment.movieApiBase,
    },
  ],
})
export class CatalogueModule {}
