import { render, screen, waitFor } from "@testing-library/react";
import { isLoggedInVar } from "../../apollo";
import { App } from "../app";
import React from "react";

jest.mock("../../routers/logged-out-router", () => {
  return {
    LoggedOutRouter: () => <span>Logged-out</span>,
  };
});

jest.mock("../../routers/logged-in-router", () => {
  return {
    LoggedInRouter: () => <span>Logged-in</span>,
  };
});

describe("<App />", () => {
  it("renders LoggedOutRouter", () => {
    const { debug } = render(<App />);
    screen.getByText("Logged-out");
  });
  it("renders LoggedInRouter", async () => {
    const { debug } = render(<App />);
    await waitFor(() => {
      isLoggedInVar(true);
    });
    screen.getByText("Logged-out");
  });
});
