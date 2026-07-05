import { gateDefinitions } from "../data/gates";
import type { GateName } from "./gameTypes";

export function evaluateGate(
  gate: GateName,
  inputs: readonly boolean[],
): boolean {
  const definition = gateDefinitions[gate];

  if (inputs.length !== definition.inputCount) {
    throw new Error(
      `${gate} expects ${definition.inputCount} input${definition.inputCount === 1 ? "" : "s"}.`,
    );
  }

  switch (gate) {
    case "AND":
      return inputs[0] && inputs[1];
    case "OR":
      return inputs[0] || inputs[1];
    case "NOT":
      return !inputs[0];
    case "XOR":
      return inputs[0] !== inputs[1];
    case "NAND":
      return !(inputs[0] && inputs[1]);
    case "NOR":
      return !(inputs[0] || inputs[1]);
    case "XNOR":
      return inputs[0] === inputs[1];
  }
}
