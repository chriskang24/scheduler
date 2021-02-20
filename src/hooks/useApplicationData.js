import { useState, useEffect } from "react";

const axios = require('axios'); 

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })

  const setDay = day => setState({ ...state, day });


  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('api/interviewers')
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

    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {
      setState({ ...state, appointments });
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

    const url = `/api/appointments/${id}`;

    return axios.delete(url)
    .then(() => {
      setState({ ...state, appointments });
    })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
 
}