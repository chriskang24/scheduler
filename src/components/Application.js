import React, { useState, useEffect } from "react";

import "components/Application.scss";
import "components/Appointment";

import DayList from "./DayList";
import Appointment from "components/Appointment";

const axios = require('axios');

export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  const setDay = day => setState({...state, day});
  const setDays = days => setState(prev => ({...prev, days}));
  const dailyAppointments = [];

  const parsedAppointments = dailyAppointments.map(appointment =>
    <Appointment
      key={appointment.id}
      {...appointment} />
  )

  // Create an effect to make a GET request to /api/days using axios and update the days state with the response.
  useEffect(() => {
    axios.get('/api/days').then(response => {
      // console.log(response.data);
      setDays([...response.data])
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
        {parsedAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}


