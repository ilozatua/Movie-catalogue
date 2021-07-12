export enum Status {
  Watched = 'Watched',
  WatchLater = 'WatchLater',
}

export enum WhenToWatch {
  Tomorrow = 'Tomorrow',
  ThisWeek = 'ThisWeek',
  ThisMonth = 'ThisWeek',
  ThisYear = 'ThisYear',
}

export interface WhenToWatchSelect {
  label: string;
  value: WhenToWatch;
}

export interface StatusForTranslate {
  label: string;
  value: Status;
}

export interface Movie {
  imdbId: string;
  title: string;
  year: string;
  director: string;
  actors: string;
  genre: string[];
  plot: string;
  poster: string;
  countries: Country[];
}

export interface Country {
  code: string;
  population: number;
}

export interface CountryResult {
  alpha2Code: string;
  population: number;
}

export interface MovieResult {
  imdbID: string;
  Title: string;
  Year: string;
  Director: string;
  Actors: string;
  Genre: string;
  Plot: string;
  Poster: string;
  Country: string;
}

export interface MovieBody {
  imdbId: string;
  uid: string;
  review: string;
  rating: number;
  status: Status;
  whenToWatch: WhenToWatch;
}

export type MovieWithId = MovieBody & { id: string };

export const WHEN_TO_WATCH: WhenToWatchSelect[] = [
  {
    label: 'catalogue.TOMORROW',
    value: WhenToWatch.Tomorrow,
  },
  {
    label: 'catalogue.THIS_WEEK',
    value: WhenToWatch.ThisWeek,
  },
  {
    label: 'catalogue.THIS_MONTH',
    value: WhenToWatch.ThisMonth,
  },
  {
    label: 'catalogue.THIS_YEAR',
    value: WhenToWatch.ThisYear,
  },
];

export const STATUS: StatusForTranslate[] = [
  {
    label: 'catalogue.WATCHED',
    value: Status.Watched,
  },
  {
    label: 'catalogue.WATCH_LATER',
    value: Status.WatchLater,
  },
];

export const RATINGS = [1, 2, 3, 4, 5];

export interface MovieListItem {
  data: MovieWithId;
  movie: MovieResult;
}

export enum EventBusEvent {
  ResetForm = 'resetForm',
}
