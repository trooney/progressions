import { simpleGenerator } from "./music";

describe("music", () => {
  it("produces a value", () => {
    const results = simpleGenerator("C", ["I", "V", "V"]);

    expect(results.measureCount).toEqual(3);
  });
});
