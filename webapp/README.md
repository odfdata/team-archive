# Team Archive Web App

This repo contains the code for the frontend dApp to access Web Archive.

Currently, it's configured to work with:

* Filecoin Virtual Machine (FEVM) hyperspace testnet
* Polygon Mumbai chain

## Project creation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Key files and structure

Constants, such as the address of the on-chain deployed smart contracts, are stored in\
`src/utils/constants.ts`

Folders are so structured:

* **public** contains all public static files
* **src** the React App files
  * **hooks** used in the application
  * **store** with the files of the Redux Store
  * **ui** are UI components, with an Atomic Design Pattern
  * **utils** for generic utils documents and classes

