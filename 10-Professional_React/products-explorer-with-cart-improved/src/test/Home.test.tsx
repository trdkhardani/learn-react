import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from '../pages/Home';

describe("Home", () => {
  it("should display 'Home' as h1", () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', {
        name: "Home",
      })
    ).toBeInTheDocument();
  });
});