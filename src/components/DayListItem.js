import React from "react";
import 'components/DayListItem.scss';
import classNames from "classnames";

const formatSpots = function(props) {
  let spots = props.spots;
  let text = "spots"

  if (props.spots === 0) {
    spots = "no";
  }

  if (props.spots === 1) {
    text = "spot";
  }

  return `${spots} ${text} remaining`
}

export default function DayListItem(props) {

  let spotsRemaining = formatSpots(props);

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li onClick={() => props.setDay(props.name)} selected={props.selected} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{spotsRemaining}</h3>
    </li>
  );
}