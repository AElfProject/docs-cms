import { describe, it, expect } from "vitest";
import { convertArrToUrl } from "./url"; // Adjust the import path as necessary

describe("convertArrToUrl", () => {
  it("should return an empty string if the input is not an array", () => {
    expect(convertArrToUrl("not an array" as any)).toBe("");
  });

  it("should return a slugified string", () => {
    const input = ["Hello", "World"];
    const expected = "hello-world";
    expect(convertArrToUrl(input)).toBe(expected);
  });

  it("should handle special characters correctly", () => {
    const input = ["Hello!", "World?"];
    const expected = "hello-world";
    expect(convertArrToUrl(input)).toBe(expected);
  });

  it("should replace 'c#' with 'csharp'", () => {
    const input = ["c#", "programming"];
    const expected = "csharp-programming";
    expect(convertArrToUrl(input)).toBe(expected);
  });

  it("should handle an empty array", () => {
    expect(convertArrToUrl([])).toBe("");
  });

  it("should convert the array to a lowercase slug", () => {
    const input = ["Hello", "World"];
    const expected = "hello-world";
    expect(convertArrToUrl(input)).toBe(expected);
  });

  it("should trim the result", () => {
    const input = [" Hello ", " World "];
    const expected = "hello-world";
    expect(convertArrToUrl(input)).toBe(expected);
  });
});
