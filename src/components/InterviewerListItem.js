import React from "react";
import "components/InterviewerListItem.scss";

var classNames = require('classnames');

export default function InterviewerListItem(props) {

  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={interviewClass} onClick={() => props.setInterviewer(props.name)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  );
}