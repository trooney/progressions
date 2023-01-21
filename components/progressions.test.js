import { render, screen } from "@testing-library/react";
import Progressions from "./progressions";
import "@testing-library/jest-dom";

describe("Progressions", () => {
  it("renders a site title", () => {
    render(
      <Progressions
        progressionCollection={[]}
        currentProgression={null}
        setProgression={() => {}}
      />
    );

    const container = screen.getByTestId("progression-container");

    expect(container).toBeInTheDocument();
  });
});
