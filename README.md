# Jokes Challenge by Nicolas Escandarani

## Setup and Development Server

Frontend:

- Run `npm install` to install the dependencies.
- Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Backend:

- Run `npm install` to install the dependencies.
- Run `npm run dev` in the backend project to start that server and be able to use the application.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Walkthrough

### Functionlities

- Display the jokes comming from the Backend in cards with pagination.
- Filter jokes by type.
- Get a random joke.
- Create a new joke.
- Delete jokes.
- Like jokes.
- Search for jokes.
- Order jokes by date or likes.

### Frontend

- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.14.

- I chose version `16.2.14` because of its proven stability and familiarity with it, although I also develop using later versions.

- I chose to develop this app with scalability and reusability in mind. I used a modular approach and created a `UI Module` to store dummy components that are used throughout the application, facilitating a future migration to a library as its own library.

## UI Module
>The UI Module is a dummy components module. Those components are used throughout the application.
>
>It is conceived to be a shared module and eventually it can be migrated into its own library.
>
>Components:
>- `AlertComponent`.
>- `ButtonComponent`.
>- `CardComponent`.
>- `DialogComponent`.
>- `DropdownComponent`.
>- `IconComponent`.
>- `MenuComponent`.
>- `SearchbarComponent`.
>- `SpinnerComponent`.

## App Module

>Interceptors:
>- `ErrorsInterceptor`: An interceptor that catches the errors from the backend and displays them in the `AlertComponent`.
>- `LoadingInterceptor`: An interceptor that displays the `SpinnerComponent` when the application is fetching data from the backend. It displays the spinner for calls that take more than 300ms.

>Services:
>- `AlertService`: Used to display the `AlertComponent` in the application.
>- `SpinnerService`: Used to display the `SpinnerComponent` in the application.
>- `StateService`: Contains the state of the application. Variables that are used throughout the application are stored here.

>Shared Components:
>- `HeaderComponent`: The header of the application. It contains the title of the application and the `SearchbarComponent`.

>Utils:
>- `AutoUnsubscribeComponent`: A class that contains the logic to unsubscribe from observables when the component is destroyed.
>>Enums:
>>- `Sorting`: The available sorting options.
>>
>>Interfaces:
>>- `SortingRule`: Used to select Sorting options.
>>- `DropdownItem`: Used to pass items to the `DropdownComponent`.
>>
>>Types:
>>- `AlertTypeOptions`: The available alert types.

## Jokes Module
>The Jokes Module is the main module of the application. It contains the main components and services to display the jokes.

>Components:
>- `JokesComponent`: The main component of the application. It contains the main logic to display the jokes and the form to add new jokes.
>- `CreateJokeDialogComponent`: A dialog component to create a new joke. It utilizes a reactive form to validate inputs.
>- `JokesHeaderComponent`: A header component that displays the `Create a Joke` button and the `Sorting` and `Filtering` options.
>- `ListComponent`: Displays the jokes as cards and it utilizes the `listItemComponent` to display each joke. Also it uses `ngx-pagination` library to paginate the jokes.
>- `ListItemComponent`: Displays the joke as a card. It contains the joke, the type tag, and the likes amount with its like button. It also has the copy the joke to the clipboard button.

>Services:
>- `JokesService`: A service that contains the main logic to interact with the backend API.
>- `RandomJokesAmount`: The amount of random jokes that we want to get from the backend.

>Enums:
>- `JokeType`: The available types of jokes.

>Interfaces:
>- `Joke`: The joke interface.
>- `ApiResponse`: The response interface that we get from the backend implementing pagination.
>- `CopyJoke`: Used only to standardize the joke object when copying it to the clipboard.

>Types:
>- `TypesBgColors`: A Map that contains the background colors for each joke type.

### Backend
- I chose to expand the Express application. Since the API is simple, I decided not to get too complicated with the implementations, as I don't think that would be the best approach for this project.

>These are the changes I made:
>
>Joke structure:
>- I added likes amount to the `Joke`.
>
> index.js:
> 
>- Added `CORS` support.
>- Added `Pagination` and `Filtering` in several endpoints.
>- Added `Persisting` of the jokes in the backend.
>- Added `POST /jokes` endpoint to create a new joke.
>- Added `POST /jokes/:id/like` endpoint to like a joke.
>- Added `POST /jokes/:id/dislike` endpoint to dislike a joke.
>- Added `DELETE /jokes/:id` endpoint to delete a joke.
>- Added `DELETE /jokes` endpoint to delete multiple jokes by an array of ids.
>
> handler.js:
>
>- Added `fs` and `path` modules for file operations to save jokes to the `index.json` file.
>- Added Joke id management with `initializeLastJokeId`, `getLastJokeId` and `updateLastJokeId` functions.
>- Added `sortByLikes` function.
>- Added `paginateAndSort` function.
>- Added the `saveJokes` function to save jokes to the `index.json` file.

## Possible Future Improvements

- `Add users` as the likes and user's own jokes are stored in the localstorage. While being a simple application, that works fine, but growing a bit more, it would be better to have the backend to store that information.
- `Migrate the UI Module to its own library`. This would make the application more modular and reusable. Also, that library could be imported to other projects.
- `Add a 'My Jokes' view and a 'My Jokes' filter`. This would allow the user to see only the jokes that they have created. That would go alongside with the user's feature.
- `Add the possibility to paginate with filters and sorting`.
