import React, { useState, useEffect } from "react";

import "components/Application.scss";
import "components/Appointment";

import DayList from "./DayList";
import Appointment from "components/Appointment";

const axios = require('axios');

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Bob Zones",
      interviewer: {
        id: 1,
        name: "Brad Pitt",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Sylvankia Mill",
      interviewer: {
        id: 1,
        name: "Pamela Smith",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Sarah Jones",
      interviewer: {
        id: 1,
        name: "Charlie Sheen",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
];


export default function Application(props) {
  
  const [day, setDay] = useState("Monday");

  const parsedAppointments = appointments.map(appointment =>
    <Appointment
      key={appointment.id}
      {...appointment} />
  )

  const [days, setDays] = useState([]);
  // Create an effect to make a GET request to /api/days using axios and update the days state with the response.
  useEffect(() => {
    axios.get('/api/days').then(response => {
      console.log(response.data);
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
            days={days}
            day={day}
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


