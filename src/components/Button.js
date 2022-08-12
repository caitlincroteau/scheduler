import React from "react";
import "components/Button.scss";
import classNames from "classnames";

export default function Button(props) {
   const { onClick, disabled, children } = props;

   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
   >
      {children}
    </button>
   );
}
