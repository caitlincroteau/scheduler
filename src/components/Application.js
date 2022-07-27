import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {

  //combine day, days appointments state into single state object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      // console.log('days', all[0].data)
      // console.log("state before get", state)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      
    });
  }, []);

  function bookInterview(id, interview) {
    console.log("id", id, " interview", interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //see setState below: we must do ...state first in order to keep the previous state info eg day, days, interviewers
    //and then the passed 'appointments' overwrites the appointments currently in state.appointments
    //if you don't do ...state, you will override the rest of the data in state and state will
    //only contain the new appointments object

    const url = `/api/appointments/${id}`

    axios
      .put(url, appointment)
      .then(response => {
        console.log('response', response)
        setState({...state, appointments});
        console.log("updated appointments", state.appointments)
        return
      })
      .catch(error => {
        console.log(error.message);
      });
  }
 
  //use getAppointments selector function to get array of appointment objects for day argument
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  // console.log("daily appointments", dailyAppointments)

  //get an array of interveiwer objects for each day argument
  const interviewersList = getInterviewersForDay(state, state.day);
  // console.log("interviewers list", interviewersList);


  const appointmentsList = dailyAppointments.map(appointment => {
    //use getInterview selector function to get interview object inside each appointment object
    const interview = getInterview(state, appointment.interview);
    // console.log(interview)


    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersList}
        bookInterview={bookInterview}
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


// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };
