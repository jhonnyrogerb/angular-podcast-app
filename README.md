# Angular Podcast App

A podcast app made with Angular 5, Pouchdb, Html5 Web Audio API and PWA Features.

This App uses the iTunes Search API as the source.

This App does not use any server-side code, all data is stored in the browser with pouchdb.

To avoid CORS errors, some requests are executed through a PUBLIC CORS PROXY: CORS-ANYWHERE, but be warned that this implementation has some limitations. In the future, a Node.js server will be implemented to serve as PROXY between the application and the iTunes Search API.

You can change the PUBLIC CORS PROXY URL in the environment.ts files.
` {  corsProxy: 'https://cors-anywhere.herokuapp.com/' }`

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
