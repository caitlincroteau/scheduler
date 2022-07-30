import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import useApplicationData  from "hooks/useApplicationData";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  //get an array of interveiwer objects for each day argument
  const interviewersList = getInterviewersForDay(state, state.day);
  // console.log("interviewers list", interviewersList);
 
  //use getAppointments selector function to get array of appointment objects for day argument
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  // console.log("daily appointments", dailyAppointments)

  const appointmentsList = dailyAppointments.map(appointment => {
    //use getInterview selector function to get interview object inside each appointment object
    const interview = getInterview(state, appointment.interview);
    console.log("interview", interview)

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersList}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });


  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {appointmentsList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

