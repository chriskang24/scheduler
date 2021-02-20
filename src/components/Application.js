import React, { useState, useEffect } from "react";

import "components/Application.scss";
import "components/Appointment";

import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


const axios = require('axios');

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({...prev, days}));
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  // console.log(interviewers);

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
    setState({ ...state, appointments });

    return axios.put(`/api/appointments/${appointment.id}`, { interview })
    
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
 

  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}

      />
    );
  });

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

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment
          key="last"
          time="5pm"
        />
      </section>
    </main>
  );
}


//backup