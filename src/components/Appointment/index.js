import React, { Fragment } from "react";
import 'components/Appointment/styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {

  const { id, time, interview, interviewers, bookInterview } = props;

  //create new interview object and currently logs
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview)
      // .then(() => {
      //   transition(SHOW);
      // })
      // .catch(error => {
      //   console.log(error);
      // })
    
  }

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"

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
      </Fragment>  
    </article>
  );
}

