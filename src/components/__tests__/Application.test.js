import React from "react";
import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, queryByText, queryByAltText, getByPlaceholderText } from "@testing-library/react";
import axios from "axios";
import Application from "components/Application";


describe("Application", () => {
 
  beforeEach(cleanup);

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    
    const { getByText } = render(<Application />);
    return waitForElement(() => getByText("Monday"))
      .then(() => {
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();
      });
      
  });
  
  //Sept 19, 2022, as per Warren's suggestiong, moved these tests to their own files
  //(Application-2.text.js, Application-3.test.js) 
  //because this test file was not resetting the mocks and was causing an error.
  //it("loads data, cancels an interview and increases the spots remaining for Monday by 1"
  //it("loads data, edits an interview and keeps the spots remaining for Monday the same"

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // Render the Application.
    const { container } = render(<Application />);

    //wait till data loads before setting appointment variable
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));

    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //wait for mode to change to SHOW and element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const dayNodes = getAllByTestId(container, "day");
    const day = dayNodes.find(day => queryByText(day, "Monday"))
    
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    // Render the Application.
    const { container } = render(<Application />);

    //  wait till data loads before setting appointment variable
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));

    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    //Check for text "Saving"
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //  Wait for error message to show
    await waitForElement(() => getByText(appointment, "Could not save appointment."));
    
    //  close error message
    fireEvent.click(getByAltText(appointment, "Close"));

    //  expect text Archie Cohen to be in the Document
    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();
   
  });


  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    
    // Render the Application.
    const { container } = render(<Application />);

    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find((app) =>
      queryByText(app, "Archie Cohen")
    );

    // Click the "Delete" button on the booked appointment.
    fireEvent.click(getByAltText(appointment, "Delete"));

    // Check that the confirmation message is shown.
    expect(getByText(appointment, "Confirm")).toBeInTheDocument();

    // Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    //  expect Deleting to be shown
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // expect ERROR_DELETE mode to show and element with the text "Could not cancel appointment." is displayed.
    await waitForElement(() => getByText(appointment, "Could not cancel appointment."));
    
    //  close the error message
    fireEvent.click(getByAltText(appointment, "Close"));

    //  expect Archie Cohen to be in the document
    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();

  });

});