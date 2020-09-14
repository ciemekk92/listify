# Listify

React application that allows user to create and manage multiple to-do lists online. Each list is stored in database and can be accessed from any device.

#### Author: Przemysław Reducha

## TODO

-   Rearrange project structure
-   Tests (Jest, Enzyme)

## Tech stack

-   React 16.13
-   Typescript
-   React Router
-   React Transition Group
-   Redux
-   Styled Components
-   polished for Styled Components
-   Firebase

## How to run:

1. Try the live demo https://listify-react.firebaseapp.com/ - you can use mocked up address, like somethingsomething(at)test.com
2. Download / clone the repository and run `npm install` in the downloaded directory to install all dependencies and then run `npm run start`.

Note: Cloning the repository will require:

1. Creating your own Firebase project.
2. Configuring Firebase to work correctly and storing API key, messaging sender ID and App ID in `.env` file in root directory.
3. Editing `./firebase/firebase.ts` file with the rest of your Firebase account's config info.
