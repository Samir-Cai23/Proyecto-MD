import { describe, expect, it } from "vitest";
import { levelsByDifficulty } from "../data/levels.ts";
import { generateTruthTable } from "./truthTable.ts";

describe("generateTruthTable", () => {
  it("generates every input combination for a two-input level in stable order", () => {
    const table = generateTruthTable(levelsByDifficulty.easy[1].circuit);

    expect(table).toEqual([
      { inputs: { A: false, B: false }, output: false },
      { inputs: { A: false, B: true }, output: false },
      { inputs: { A: true, B: false }, output: false },
      { inputs: { A: true, B: true }, output: true },
    ]);
  });

  it("generates eight rows for the three-input hard level", () => {
    const table = generateTruthTable(levelsByDifficulty.hard[1].circuit);

    expect(table).toHaveLength(8);
    expect(table.filter((row) => row.output)).toEqual([
      { inputs: { A: false, B: true, C: true }, output: true },
      { inputs: { A: true, B: false, C: true }, output: true },
    ]);
  });
});
