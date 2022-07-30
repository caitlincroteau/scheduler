import { useState, useEffect } from "react";
import axios from 'axios';

// Our useApplicationData Hook will return an object with four keys:

// The state object will maintain the same structure.
// The setDay action can be used to set the current day.
// The bookInterview action makes an HTTP request and updates the local state.
// The cancelInterview action makes an HTTP request and updates the local state.

export default function useApplicationData() {
    //combine day, days appointments state into single state object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  console.log("spots at start", state.days)

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      console.log('appointments', all[1].data)
      // console.log("spots at start", all[0].data)
      // console.log("state before get", state)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      
    });
  }, []);


  const updateSpots= function(id, addition=false) {
    const newDays = [
      ...state.days
    ]
    console.log("days in update spots before", newDays)

    //loop through days array to find day object that contains target appointment id
    for (const d of newDays) {
      //Book Interview: when you find the day with target appointment id, subtract one from remaining spots
      if (d.appointments.includes(id) && addition) {
        d.spots = d.spots - 1;
        console.log("found it - days at d after", d)
      }
      //Cancel Interview: when you find the day with target appointment id, add one to remaining spots
      if (d.appointments.includes(id) && !addition) {
        d.spots = d.spots + 1;
        console.log("found it - days at d after", d)
      }  
    }
      console.log("days after", newDays)
    return newDays;
  }


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

    const days = updateSpots(id, true);
    console.log("days in book interview", days)

    //see setState below: we must do ...state first in order to keep the previous state info eg day, days, interviewers
    //and then the passed 'appointments' overwrites the appointments currently in state.appointments
    //if you don't do ...state, you will override the rest of the data in state and state will
    //only contain the new appointments object

    const url = `/api/appointments/${id}`

    //return the promise
    return axios
      .put(url, appointment)
      .then(response => {
        console.log('response', response)
        setState({...state, appointments, days});
        // console.log("updated appointments, days", state.appointments, state.days)
        
      });
  }

  function cancelInterview(id) {
    console.log("id in app.js", id)
    //create new appointment object, copy data from that appointment in state, set the new interview to null
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    //create new appointments object, copy data from appointments in state, update the appointment id with new the appointment data
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const days = updateSpots(id, false);

    const url = `/api/appointments/${id}`

    //return the promise
    return axios
      .delete(url)
      .then(response => {
        console.log('reponse', response);
        //to setState, copy all existing state data with spread, then replace appointments object with new appointments object
        setState({...state, appointments, days});
      });
  }
  return {state, setDay, bookInterview, cancelInterview}

}

