//helper function for getAppointmentsForDay/getInterviewersForDay
const getIds = function(state, day) {
  let appointmentIds = [];
  let interviewerIds = [];

  //loop objects in state.days array
  // to find appointmentIds and interviewerIds array for target 'day'
  for (const e of state.days) {
    if (e.name === day){
      appointmentIds.push(...e.appointments);
      interviewerIds.push(...e.interviewers);
    }  
  }

  return [appointmentIds, interviewerIds];
}


export function getAppointmentsForDay(state, day) {
  const result = [];
  const [appointmentIds, interviewerIds] = getIds(state, day);
  
  //loop through appointmentIds array for target day,
  //find corresponding id/object in state.appointments object and add it to results array
  if (appointmentIds.length !== 0) {
    for (const id of appointmentIds) {
      result.push(state.appointments[id]);
    }  
  }
  
  return result;
}


export function getInterviewersForDay(state, day) {
  const result = [];
  const [appointmentIds, interviewerIds] = getIds(state, day);
  
  //loop through interviewerIds array for target day,
  //find corresponding id/object in state.interviewers object, and add it to results array
  if (interviewerIds.length !== 0) {
    for (const id of interviewerIds) {
      result.push(state.interviewers[id]);
    }  
  }
  
  return result;
}


export function getInterview(state, interview) {
  //checks if interview exists
  if (!interview) {
    return null;
  }

  //takes in object that contains an interviewer
  const interviewObj = {};

  //set student key's value in interviewObj
  interviewObj.student = interview.student;

  //get interviewer id from state.appointments.interview
  const interviewerId = interview.interviewer; 

  //look up the interviewer data with the interviewerId
  const interviewerData = state.interviewers[interviewerId];

  //set interviewer key's value in interviewObj
  interviewObj.interviewer = interviewerData;

  return interviewObj;
}

