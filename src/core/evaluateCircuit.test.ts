import { describe, expect, it } from "vitest";
import { levelsByDifficulty } from "../data/levels.ts";
import { evaluateCircuit } from "./evaluateCircuit.ts";

function getLevel(difficulty: "easy" | "hard", levelNumber: number) {
  const level = levelsByDifficulty[difficulty][levelNumber];

  if (!level) {
    throw new Error(`Missing ${difficulty} level ${levelNumber}`);
  }

  return level;
}

describe("evaluateCircuit", () => {
  it("preserves the seven practice gate truth conditions", () => {
    expect(
      evaluateCircuit(getLevel("easy", 1).circuit, { A: true, B: true }),
    ).toBe(true);
    expect(
      evaluateCircuit(getLevel("easy", 1).circuit, { A: true, B: false }),
    ).toBe(false);

    expect(
      evaluateCircuit(getLevel("easy", 2).circuit, { A: false, B: true }),
    ).toBe(true);
    expect(
      evaluateCircuit(getLevel("easy", 2).circuit, { A: false, B: false }),
    ).toBe(false);

    expect(evaluateCircuit(getLevel("easy", 3).circuit, { A: false })).toBe(
      true,
    );
    expect(evaluateCircuit(getLevel("easy", 3).circuit, { A: true })).toBe(
      false,
    );

    expect(
      evaluateCircuit(getLevel("easy", 4).circuit, { A: true, B: false }),
    ).toBe(true);
    expect(
      evaluateCircuit(getLevel("easy", 4).circuit, { A: true, B: true }),
    ).toBe(false);

    expect(
      evaluateCircuit(getLevel("easy", 5).circuit, { A: false, B: false }),
    ).toBe(true);
    expect(
      evaluateCircuit(getLevel("easy", 5).circuit, { A: true, B: true }),
    ).toBe(false);

    expect(
      evaluateCircuit(getLevel("easy", 6).circuit, { A: false, B: false }),
    ).toBe(true);
    expect(
      evaluateCircuit(getLevel("easy", 6).circuit, { A: true, B: false }),
    ).toBe(false);

    expect(
      evaluateCircuit(getLevel("easy", 7).circuit, { A: true, B: true }),
    ).toBe(true);
    expect(
      evaluateCircuit(getLevel("easy", 7).circuit, { A: true, B: false }),
    ).toBe(false);
  });

  it("preserves challenge level 1 as (A XOR B) AND C", () => {
    const hardLevelOne = getLevel("hard", 1);

    expect(
      evaluateCircuit(hardLevelOne.circuit, { A: true, B: false, C: true }),
    ).toBe(true);
    expect(
      evaluateCircuit(hardLevelOne.circuit, { A: false, B: true, C: true }),
    ).toBe(true);
    expect(
      evaluateCircuit(hardLevelOne.circuit, { A: true, B: true, C: true }),
    ).toBe(false);
    expect(
      evaluateCircuit(hardLevelOne.circuit, { A: true, B: false, C: false }),
    ).toBe(false);
  });

  it("preserves challenge level 7 as (A XNOR B) AND NAND(C, D)", () => {
    const hardLevelSeven = getLevel("hard", 7);

    expect(
      evaluateCircuit(hardLevelSeven.circuit, {
        A: true,
        B: true,
        C: true,
        D: false,
      }),
    ).toBe(true);
    expect(
      evaluateCircuit(hardLevelSeven.circuit, {
        A: false,
        B: false,
        C: false,
        D: false,
      }),
    ).toBe(true);
    expect(
      evaluateCircuit(hardLevelSeven.circuit, {
        A: true,
        B: false,
        C: true,
        D: false,
      }),
    ).toBe(false);
    expect(
      evaluateCircuit(hardLevelSeven.circuit, {
        A: true,
        B: true,
        C: true,
        D: true,
      }),
    ).toBe(false);
  });
});
