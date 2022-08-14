# Interview Scheduler

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. 

The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database. Sample data for this app can be accesed via the [Scheduler-API](https://github.com/lighthouse-labs/scheduler-api) server, which you must set up separately.

This project was completed as part of the Full Stack Web Development bootcamp at [Lighthouse Labs](http://www.lighthouselabs.ca).

!["Interview Scheduler](https://github.com/caitlincroteau/scheduler/blob/master/docs/interview-scheduler.png)
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
!["Creating an appointment"](https://github.com/caitlincroteau/scheduler/blob/master/docs/interview-scheduler-ADD.gif)

## Editing and deleting an appointment
!["Editing an appointment"](https://github.com/caitlincroteau/scheduler/blob/master/docs/interview-schedulerEDIT-DELETE.gif)

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