
export default function getAppointmentsForDay(state, day) {

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


// export function getAppointmentsForDay(state, day) {
//   const filteredDay = state.days.find((currentDay) => currentDay.name === day);
//   return  filteredDay ? filteredDay.appointments.map((id) => state.appointments[id]) : [];
// }