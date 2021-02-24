# Interview Scheduler

A single-page application using ReactJS, Webpack, Jest, Storybook, and Cypress that allows users to book, edit, and cancel interviews.

## Final Product

Adding a new appointment:

![Add Appointment](https://user-images.githubusercontent.com/75704947/109070328-5a8e3680-76c0-11eb-9339-14f5c53f7621.gif)

Editing an existing appointment:

![Editing an appointment](https://user-images.githubusercontent.com/75704947/109070902-194a5680-76c1-11eb-9aeb-086f4a3d6b9e.gif)

Deleting an existing appointment:

![Deleting an appointment](https://user-images.githubusercontent.com/75704947/109070910-1a7b8380-76c1-11eb-842d-cc73e81db85d.gif)

## Getting Started
1. Fork this repository, then clone your fork of this repository.
2. Go to the [scheduler-api repository](https://github.com/jatanassian/scheduler-api) that contains the database and fork it, then clone your fork of this repository.
3. Install dependencies in both folders (scheduler & shceduler-api) using the `npm install` command.
4. Open two terminals, one for scheduler and the second for scheduler-api.
5. Run the both servers using the `npm start` command.
6. Go to <http://localhost:8000/> in your browser to test out the app.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress Visual Testbed

```sh
npm run cypress
```

## Server-side Code:
The server side code is available at https://github.com/JimmyLin39/scheduler-api


## Dependencies


Install dependencies with `npm install`.
 
"axios": "^0.21.1"

"classnames": "^2.2.6",

"normalize.css": "^8.0.1",

"react": "^16.9.0",

"react-dom": "^16.9.0",

"react-scripts": "3.0.0"


## devDependencies

"@babel/core": "^7.4.3",

"@storybook/addon-actions": "^5.0.10",

"@storybook/addon-backgrounds": "^5.0.10",

"@storybook/addon-links": "^5.0.10",

"@storybook/addons": "^5.0.10",

"@storybook/react": "^5.0.10",

"@testing-library/jest-dom": "^4.0.0",

"@testing-library/react": "^8.0.7",

"@testing-library/react-hooks": "^5.0.3",

"babel-loader": "^8.0.5",
"node-sass": "^4.14.0",

"prop-types": "^15.7.2",

"react-test-renderer": "^16.9.0"
