# Interview Scheduler

Interview Scheduler is a single-page application for booking appointments. It allows students to book and manage interviews with mentors. Appointments can be made between 12pm and 5pm, Monday through Friday. Students can update an existing appointment by editing the student name or by changing the selected interviewer. Students also have the ability to delete a booked appointment.

The front-end of this app was built using React. Data for this app is accesed via the [Scheduler-API](https://github.com/lighthouse-labs/scheduler-api) server, which you must set up separately.

This project was completed as part of the Full Stack Web Development bootcamp at [Lighthouse Labs](http://www.lighthouselabs.ca).
## Setup

- Create a new repository using this one as a template, and clone it onto your local device.
- Install dependencies with `npm install`.
- Visit the [Scheduler-API](https://github.com/lighthouse-labs/scheduler-api) repository and follow the instructions for setting up the database.
- In a terminal window, start the Scheduler-API server with `npm start`.
- In another terminal window, run the Webpack Development Server (**Scheduler**) wtih `npm start`.
- The app will be served at `http://localhost:8000`.

## Run both Webpack Development Server and Scheduler-API server

```sh
npm start
```

## Dependencies

- `axios` ^0.27.2
- `classnames` ^2.2.6
- `normalize.css` ^8.0.1
- `react` ^16.9.0
- `react-dom` ^16.9.0
- `react-scripts` 3.4.4

## 
## Creating an appointment

## Editing and deleting an appointment

## Testing
### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```

### Running Cypress Test Framework

```sh
npm run cypress
```
Running Cypress will require further set-up. Please refer to the [Cypress documentation](https://www.cypress.io/).