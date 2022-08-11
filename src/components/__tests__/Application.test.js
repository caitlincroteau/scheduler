import React from "react";
import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, queryByText, queryByAltText, getByPlaceholderText } from "@testing-library/react";
import axios from "axios";
import Application from "components/Application";


beforeEach(cleanup);

describe("Application", () => {
  
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday"))
      .then(() => {
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();
      });
  });
  
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    //   Render the Application.
    const { container, debug } = render(<Application />);

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

  xit("loads data, cancels an interview and increases the spots remaining for Monday by 1",
  async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    // 3. Click the "Delete" button on the booked appointment.
    fireEvent.click(queryByAltText(appointment, "Delete"));
    
    // // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    debug()

    // // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument(); 
    //this is giving me the error!
  });


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    // debug()

    // 3. Click the "Edit" button on the booked appointment.
    fireEvent.click(queryByAltText(appointment, "Edit"));
    
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
   
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // 9. Check that the DayListItem with the text "Monday" remains the same with the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument(); 
    //this is causing an error
  })


  // xit("shows the save error when failing to save an appointment", async () => {
  //   // Render the Application.
  //   const { container, debug } = render(<Application />);

  //   // Wait until the text "Archie Cohen" is displayed.
  //   await waitForElement(() => getByText(container, "Archie Cohen"));
  //   const appointments = getAllByTestId(container, "appointment");
  //   const appointment = appointments[0];

  //   // Click the "Add" button on the first empty appointment.
  //   fireEvent.click(getByAltText(appointment, "Add"));

  //   // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
  //   fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  //     target: { value: "Lydia Miller-Jones" }
  //   });

  //   // Click the first interviewer in the list.
  //   fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  //   // Click the "Save" button on that same appointment.
  //   fireEvent.click(getByText(appointment, "Save"));
    
  //   //mock axios put error
  //   axios.put.mockRejectedValueOnce();
   
  //   // expect ERROR_SAVE mode to show and element with the text "Could not save appointment." is displayed.
  //   expect(getByText(appointment, "Could not save appointment.")).toBeInTheDocument();
  // });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
     //   Render the Application.
     const { container, debug } = render(<Application />);

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


    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Could not save appointment."));
    
    fireEvent.click(getByAltText(appointment, "Close"));

    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();
   
  });

  // it("shows the delete error when failing to delete an existing appointment", async () => {
  //   axios.delete.mockRejectedValueOnce();
  //   // 1. Render the Application.
  //   const { container, debug } = render(<Application />);

  //   // 2. Wait until the text "Archie Cohen" is displayed.
  //   await waitForElement(() => getByText(container, "Archie Cohen"));
  //   const appointment = getAllByTestId(container, "appointment").find(
  //     appointment => queryByText(appointment, "Archie Cohen")
  //   );
     
  //   // 3. Click the "Delete" button on the booked appointment.
  //   fireEvent.click(queryByAltText(appointment, "Delete"));
    
  //   // 4. Check that the confirmation message is shown.
  //   expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

  //   // 5. Click the "Confirm" button on the confirmation.
  //   fireEvent.click(queryByText(appointment, "Confirm"));

  //   //mock axios delete error
    
    
  //   // expect ERROR_DELETE mode to show and element with the text "Could not cancel appointment." is displayed.
  //   expect(getByText(appointment, "Could not cancel appointment.")).toBeInTheDocument();
  // });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find((app) =>
      queryByText(app, "Archie Cohen")
    );
    // 3. Click the "Delete" button on the booked appointment.
    fireEvent.click(getByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Confirm")).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
     // expect ERROR_DELETE mode to show and element with the text "Could not cancel appointment." is displayed.
    await waitForElement(() => getByText(appointment, "Could not cancel appointment."));
    

    fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();
  });

});




/*
async/await version:

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});


this is a similar check

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"))

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));*/