import { describe, expect, it } from "vitest";
import { evaluateGate } from "./evaluateGate.ts";

const booleanPairs = [
  {
    inputs: [false, false] as const,
    and: false,
    or: false,
    xor: false,
    nand: true,
    nor: true,
    xnor: true,
  },
  {
    inputs: [false, true] as const,
    and: false,
    or: true,
    xor: true,
    nand: true,
    nor: false,
    xnor: false,
  },
  {
    inputs: [true, false] as const,
    and: false,
    or: true,
    xor: true,
    nand: true,
    nor: false,
    xnor: false,
  },
  {
    inputs: [true, true] as const,
    and: true,
    or: true,
    xor: false,
    nand: false,
    nor: false,
    xnor: true,
  },
];

describe("evaluateGate", () => {
  it.each(booleanPairs)(
    "evaluates binary gates for %j",
    ({ inputs, and, or, xor, nand, nor, xnor }) => {
      expect(evaluateGate("AND", inputs)).toBe(and);
      expect(evaluateGate("OR", inputs)).toBe(or);
      expect(evaluateGate("XOR", inputs)).toBe(xor);
      expect(evaluateGate("NAND", inputs)).toBe(nand);
      expect(evaluateGate("NOR", inputs)).toBe(nor);
      expect(evaluateGate("XNOR", inputs)).toBe(xnor);
    },
  );

  it("evaluates NOT with one input", () => {
    expect(evaluateGate("NOT", [false])).toBe(true);
    expect(evaluateGate("NOT", [true])).toBe(false);
  });

  it("throws when a gate receives the wrong input count", () => {
    expect(() => evaluateGate("NOT", [true, false])).toThrow(
      /expects 1 input/i,
    );
    expect(() => evaluateGate("AND", [true])).toThrow(/expects 2 inputs/i);
  });
});
