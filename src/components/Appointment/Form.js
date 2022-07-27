import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {

  const { id, time, interview, interviewers, bookInterview, onSave, onCancel }= props;

  //state
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  //for cancel button/function
  const reset = function() {
    setStudent("");
    setInterviewer(null);
  }

  //for cancel button
  const cancel = function() {
    reset();
    onCancel();
  }

  //for save button
  const save = function () {
    //creates new interview object and books the interview (index.js)
    onSave(student, interviewer);
  }

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          {/* prevents form from submitting when enter button pressed */}
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onClick={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>

  );
}