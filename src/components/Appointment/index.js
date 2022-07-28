import React, { Fragment, useEffect } from "react";
import 'components/Appointment/styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM"
const EDIT = "EDIT";

export default function Appointment(props) {

  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  //create new interview object and update db and state
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    bookInterview(id, interview)
    .then(() => transition(SHOW));
  }

  //delete interview
  function cancel() {
    transition(DELETING);
    // console.log('id in index', id)

    cancelInterview(id)
    .then(() => transition(EMPTY));
  }

  function edit() {
    transition(EDIT)
    // console.log('interviewers', interviewers)
    // console.log('interview', interview.interviewer)
  }
  

  return (
    <article className="appointment">
      <Header
        time={time}
      />
      <Fragment>
        {mode === EMPTY && (
          <Empty
            onAdd={() => {transition(CREATE)}}
          />)}

        {mode === SHOW && (
          <Show
            student={interview.student}
            interviewer={interview.interviewer}
            onDelete={() => {transition(CONFIRM)}}
            onEdit={edit}
          />
        )}

        {mode === CREATE && (
          <Form
            interviewers = {interviewers}
            onSave={save}
            onCancel={() => {back()}}
          />
        )}
        
        {mode === EDIT && (
          <Form
            student={interview.student}
            interviewers={interviewers}
            interviewer={interview.interviewer}
            onSave={save}
            onCancel={() => {back()}}
          />
        )}

        {mode === SAVING && (
          <Status
            message="Saving"
          />
        )}

        {mode === DELETING && (
          <Status
            message="Deleting"
          />
        )}

        {mode === CONFIRM && (
          <Confirm 
            onConfirm={cancel}
            onCancel={() => {back()}}
          />
        )}

        
      </Fragment>  
    </article>
  );
}
