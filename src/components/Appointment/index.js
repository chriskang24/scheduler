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

const axios = require('axios');

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CONFIRM = "CONFIRM";
const ERROR = "ERROR";
const CREATE = "CREATE";
const DELETING = 'DELETING';
const SAVING = 'SAVING';
const EDITING = 'EDITING';
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY

  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    axios.put(`/api/appointments/${props.id}`, { interview })
    
      .then(() => {
        props.bookInterview(props.id, interview)
        transition(SHOW)
      })
      .catch(error => transition(ERROR_SAVE, true));
  }

  function cancelAppointment() {

    transition(DELETING, true)

    const url = `/api/appointments/${props.id}`;
    axios.delete(url)
      .then(() => {
        props.cancelInterview(props.id)
        transition(EMPTY)
      })
      .catch(error => transition(ERROR_DELETE, true));


  }

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === EMPTY &&
        <Empty
          onAdd={() => transition(CREATE)}
        />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDITING)}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={cancelAppointment}
          onCancel={back}
        />
      )}
      {mode === SAVING && (
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
          onSave={save}
        />
      )}
      {mode === DELETING && (
        <Status
          message="Deleting..."
        />
      )}
      {mode === EDITING && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment."
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not delete appointment."
          onClose={back}
        />
      )}



    </article>
  )
}



