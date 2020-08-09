# Listify

React application that allows user to create and manage multiple to-do lists online. Each list is stored in database and can be accessed from any device.

#### Author: Przemysław Reducha

## TODO

-   ASAP: Redesign layout into more modern one, place correct media queries.
-   Add new containers - Today / Tomorrow tasks
-   Rearrange project structure
-   Clean up CSS
-   Tests (Jest, Enzyme)

## Tech stack

-   React 16.13
-   Typescript
-   React Router
-   React Transition Group
-   Redux
-   Styled Components
-   Firebase

## How to run:

1. Try the live demo https://listify-react.firebaseapp.com/
2. Download / clone the repository and run `npm install` in the downloaded directory to install all dependencies and then run `npm run start`.

Note: Cloning the repository will require:

1.  Configuring Firebase to work correctly and storing API key, messaging sender ID and App ID in `.env` file in root directory.
2.  Editing `./firebase/firebase.ts` file with the rest of your Firebase account's config info.
