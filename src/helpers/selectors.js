
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
