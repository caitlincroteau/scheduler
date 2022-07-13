import React from "react";
import classNames from "classnames";
import 'components/InterviewerListItem.scss';

export default function(props) {

  const listClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return(
    <li className={listClass} onClick={() => props.setInterviewer(props.id)} selected={props.selected}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );

}
//is putting selected={props.selected} in the li doubling up on work? check this also in daylistitem!