import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, waitForElementToBeRemoved, queryByText, getByPlaceholderText } from "@testing-library/react";
// jest.mock("axios");
import Application from "components/Application";


afterEach(cleanup);

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
    const { container, debug } = render(<Application />);
    //wait till data loads before setting appointment variable
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    //test add button
    fireEvent.click(getByAltText(appointment, "Add"));
    //test student name input
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    //test interview selector
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //test save button
    fireEvent.click(getByText(appointment, "Save"));
    //expect SAVING mode to show
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    //wait for mode to change to SHOW, then check that student name input was sent via put request
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    //grab day node that contains "Monday"
    const dayNodes = getAllByTestId(container, "day");
    const day = dayNodes.find(day => queryByText(day, "Monday"))
    //check that Monday node says "not spots remaining"
    expect(getByText(day, "no spots remaining")).toBeInTheDocument(); 
  
  });
})


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