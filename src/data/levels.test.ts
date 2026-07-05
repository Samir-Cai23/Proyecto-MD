import { describe, expect, it } from "vitest";
import { allLevels, levelsByDifficulty } from "./levels.ts";

describe("levelsByDifficulty", () => {
  it("contains the guided practice route and a seven-level challenge route", () => {
    expect(Object.keys(levelsByDifficulty.easy)).toEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
    ]);
    expect(Object.keys(levelsByDifficulty.hard)).toEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
    ]);
    expect(allLevels).toHaveLength(14);
  });

  it("keeps display metadata needed by the current UI", () => {
    expect(levelsByDifficulty.easy[1]).toMatchObject({
      id: "easy-1",
      title: "Práctica - AND",
      inputs: ["A", "B"],
      gates: ["AND"],
    });
    expect(levelsByDifficulty.easy[7]).toMatchObject({
      id: "easy-7",
      title: "Práctica - XNOR",
      inputs: ["A", "B"],
      gates: ["XNOR"],
    });
    expect(levelsByDifficulty.hard[2]).toMatchObject({
      id: "hard-2",
      title: "Reto 2 - OR",
      inputs: ["A", "B", "C"],
      gates: ["OR", "AND"],
    });
    expect(levelsByDifficulty.hard[7]).toMatchObject({
      id: "hard-7",
      title: "Reto 7 - XNOR",
      inputs: ["A", "B", "C", "D"],
      gates: ["XNOR", "NAND", "AND"],
    });
  });

  it("distributes the seven learned gates across the challenge route", () => {
    const challengeGates = new Set(
      Object.values(levelsByDifficulty.hard).flatMap((level) => level.gates),
    );

    expect([...challengeGates].sort()).toEqual([
      "AND",
      "NAND",
      "NOR",
      "NOT",
      "OR",
      "XNOR",
      "XOR",
    ]);
  });
});
