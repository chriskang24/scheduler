import React from "react";

import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {

 const toDisplay = props.interview ?
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
    /> :
    <Empty />
  
  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      { toDisplay }
    </article>
  )
}

// If props.interview is truthy (an interview object) the Appointment will render the <Show /> component, else it should render the <Empty /> component.
