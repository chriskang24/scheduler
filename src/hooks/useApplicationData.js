import { useState, useEffect } from "react";

import axios from 'axios'

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })

  const setDay = day => setState({ ...state, day });

  const findDays = function (id, appointments) {
    const newDays = state.days.map(day => {
      if (day.appointments.includes(id)) {
        return {...day, spots: day.appointments.filter(appointmentId => {return (appointments[appointmentId].interview === null)}).length}
      } else {
        return day;
      }
    })

    return newDays;
  }

  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(responses => {

      setState(prev =>
      ({
        ...prev,
        days: responses[0].data,
        appointments: responses[1].data,
        interviewers: responses[2].data
      }))

    })
  }, [])


  function bookInterview(id, interview) {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // console.log(appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment

    };
    // console.log(appointments)

    const days = findDays(id, appointments);

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState(state => ({ ...state, days, appointments }));
      })

  }

  function cancelInterview(id) {
    // console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    // console.log(appointment);

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    // console.log(appointments);

    const days = findDays(id, appointments);

    const url = `/api/appointments/${id}`;

    return axios.delete(url)
      .then(() => {
        setState(state => ({ ...state, days, appointments }));
      })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}