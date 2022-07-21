export function getAppointmentsForDay(state, day) {
  const result = [];
  const appointmentIds = getAppointmentIds(state, day);
  
  //loop through appointmentIds array for target day,
  //find corresponding id/object in state.appointments object, and add it to results array
  if (appointmentIds.length !== 0) {
    for (const id of appointmentIds) {
      result.push(state.appointments[id]);
    }  
  }
  
  return result;
}

const getAppointmentIds = function(state, day) {
  let appointmentIds = [];

  //loop objects in state.days array
  // to find appointmentIds array for target 'day'
  for (const e of state.days) {
    if (e.name === day){
      appointmentIds.push(...e.appointments);
    }  
  }
 
  return appointmentIds;
}

