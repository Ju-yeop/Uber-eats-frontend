/* eslint-disable testing-library/no-wait-for-side-effects */
import { render, screen, waitFor } from "@testing-library/react";
import { ME_QUERY } from "../../hooks/useMe";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "../header";
import { MockedProvider } from "@apollo/client/testing";

describe("<Header />", () => {
  it("renders verify banner", async () => {
    await waitFor(async () => {
      render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: "",
                    role: "",
                    verified: false,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      screen.getByText("Please Verify your eamil.");
    });
  });

  it("renders without verify banner", async () => {
    await waitFor(async () => {
      render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: "",
                    role: "",
                    verified: true,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.queryByText("Please Verify your email.")).toBeNull();
    });
  });
});
