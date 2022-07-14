import React from "react";
import 'components/InterviewerList.scss';
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        // selected={interviewer.id === value}
        // setInterviewer={() => onChange(interviewer.id)}
        // have commented these so story will load correctly
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">
        Interviewer
      </h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  );
}