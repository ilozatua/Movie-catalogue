// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  movieApiBase: 'https://www.omdbapi.com/?apikey=540d1872',
  firebase: {
    apiKey: 'AIzaSyCBVOiX1VE-AyQ2WLpQ8SiGQr_Al0uqOu4',
    authDomain: 'movie-catalogue-a6dad.firebaseapp.com',
    projectId: 'movie-catalogue-a6dad',
    storageBucket: 'movie-catalogue-a6dad.appspot.com',
    messagingSenderId: '367547911203',
    appId: '1:367547911203:web:6ebce586199e03a8d37596',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
