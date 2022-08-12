import { useState, useEffect } from "react";
import axios from 'axios';


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

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);


  //helper function for bookInterview, cancelInterview
  const updateSpots= function(id, addition=false, edit=false) {
    const newDays = [
      ...state.days
    ];
    
    if(edit) {
      return newDays;
    }

    //loop through days array to find day object that contains target appointment id
    for (const d of newDays) {

      //Book Interview: when you find the day with target appointment id, subtract one from remaining spots
      if (d.appointments.includes(id) && addition) {
        d.spots = d.spots - 1;
      }

      //Cancel Interview: when you find the day with target appointment id, add one to remaining spots
      if (d.appointments.includes(id) && !addition) {
        d.spots = d.spots + 1;
      } 
    }
    
    return newDays;
  }


  // The bookInterview action makes an HTTP request and updates the local state.
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(id, true, state.appointments[id].interview);
    const url = `/api/appointments/${id}`

    //return the promise
    return axios
      .put(url, appointment)
      .then(response => {
        // console.log('response', response)
        setState((prev) => {
          return {...prev, appointments, days}
        });        
      });
  }


  // The cancelInterview action makes an HTTP request and updates the local state.
  function cancelInterview(id) {
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
        setState((prev) => {
          return {...prev, appointments, days}
        });
      });
  }


  return {state, setDay, bookInterview, cancelInterview};

}

//Please note, to update state we must do '...state' (spread) first in order to keep the previous state info eg day, days, interviewers
//and then the passed 'appointments' overwrites the appointments currently in state.appointments
//if you don't do ...state, you will override the rest of the data in state and state will
//only contain the new appointments object.