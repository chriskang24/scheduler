
export function getAppointmentsForDay(state, day) {

  const dailyAppointments = [];

  state.days.forEach(element => {

    if (element.name === day) {

      element.appointments.forEach(id =>
        dailyAppointments.push(state.appointments[id]))
      // console.log(dailyAppointments);
    }
  })

  return dailyAppointments;
};


export function getInterview(state, interview) {

  if (interview === null) {
    return null;
  }

  const result = { ...interview };
  // console.log(result);

  let interviewerInfo = Object.values(state.interviewers)
  // console.log(interviewerInfo)

  interviewerInfo.forEach(element => {
    // console.log(element)
    if (interview.interviewer === element.id) {
      result.interviewer = element;
    }
  })
  // console.log(result);
  return result;

};

