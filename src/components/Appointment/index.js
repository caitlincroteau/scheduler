import React, { Fragment, useEffect } from "react";
import 'components/Appointment/styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {

  const { id, time, interview, interviewers, bookInterview } = props;

  //create new interview object and update db and state
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    // transition(SAVING);
    //uncomment this when transition(SHOW) solved

    bookInterview(id, interview)
    //transition(SHOW);
  }
  

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING ="SAVING";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );
  
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
          />
        )}

        {mode === CREATE && (
          <Form
            interviewers = {interviewers}
            onSave={save}
            onCancel={() => {back()}}
          />
        )}

        {mode === SAVING && (
          <Status
            message="Saving."
          />
        )}
      </Fragment>  
    </article>
  );
}
