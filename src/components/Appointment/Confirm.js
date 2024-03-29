import React from "react";
import Button from "components/Button";

export default function Confirm(props) {

  const { onCancel, onConfirm, message } = props;

  return (
    <main className="appointment__card appointment__card--confirm" data-testid="confirmation">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button onClick={onCancel} danger>Cancel</Button>
        <Button onClick={onConfirm} danger>Confirm</Button>
      </section>
    </main>

  );
}