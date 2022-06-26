# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Redux Store libraries used:

- Redux Toolkit for State Management.
- RTK Query for data fetching (full compatibility with Typescript) through
	- API slice list all server base URL & endpoints for data fetching.

All base pages are stored in the pages folder.
Common re-usable components are stored in components folder.

Authentication & Authorization [yet to complete]:
Jwt token is stored on local storage.
Upon login, it will be set on the store once login request is fulfilled.
Custom useAuth() hooks to encapsulate login,logout & management of token.

Dashboard & Analytics:
- Bar charts used to render breakdown of books by genre && year published.
- Libraries used: Re-charts


### Screenshots of pages
![fe1][fe1]
![fe2][fe2]
![fe3][fe3]
![fe4][fe4]
![fe5][fe5]

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


[fe1]: src/screenshots/loginPage.png
[fe2]: src/screenshots/userPage.png
[fe3]: src/screenshots/bookPage.png
[fe4]: src/screenshots/DashboardPage.png
[fe5]: src/screenshots/Borrowing.png
