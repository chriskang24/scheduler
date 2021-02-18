import React from "react";

import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import Form from "./Form";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CONFIRM = "CONFIRM";
const STATUS = "STATUS";
const ERROR = "ERROR";
const CREATE = "CREATE";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === EMPTY && 
      <Empty 
      onAdd={ () => transition(CREATE)} 
      />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CONFIRM && ( 
      <Confirm
      message="Are you sure you would like to delete?"
      // onConfirm={onDelete}
 
      onCancel={back}
      />
      )}
      {mode === STATUS && (
      <Status
      message="Saving..."
      />
      )}
      {mode === ERROR && (
        <Error
        message="Could not delete appointment."
        onClose={back}
        />
      )}
      {mode === CREATE && (
        <Form 
        interviewers={props.interviewers}
        onCancel={back}
        // onSave={save}
        />
      )}

    </article>
  )
}

// If props.interview is truthy (an interview object) the Appointment will render the <Show /> component, else it should render the <Empty /> component.

