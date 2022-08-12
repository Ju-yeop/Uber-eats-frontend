import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Restaurant } from "../restaurant";

describe("<Restaurant />", () => {
  it("renders OK with props", () => {
    const restaurantProps = {
      id: "1",
      name: "name",
      categoryName: "categoryName",
      coverImg: "test",
    };
    const {
      container: { firstChild },
    } = render(
      <Router>
        <Restaurant {...restaurantProps} />
      </Router>
    );
    screen.getByText(restaurantProps.name);
    screen.getByText(restaurantProps.categoryName);
    expect(firstChild).toHaveAttribute(
      "href",
      `/restaurants/${restaurantProps.id}`
    );
  });
});
