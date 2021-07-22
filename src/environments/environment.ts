// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  movieApiBase: 'https://www.omdbapi.com/?apikey=540d1872',
  firebase: {
    apiKey: "AIzaSyCj4cxjyKAStu6d6jfbqnkkOmZffHxqwRI",
    authDomain: "movie-catalogue-6ae1e.firebaseapp.com",
    projectId: "movie-catalogue-6ae1e",
    storageBucket: "movie-catalogue-6ae1e.appspot.com",
    messagingSenderId: "299458533981",
    appId: "1:299458533981:web:72d269923ae5201afc4bb4"
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
