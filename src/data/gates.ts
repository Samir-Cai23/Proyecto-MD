import type { GateName } from "../core/gameTypes";

export type GateDefinition = {
  name: GateName;
  inputCount: 1 | 2;
  label: string;
  description: string;
};

export const gateDefinitions: Record<GateName, GateDefinition> = {
  AND: {
    name: "AND",
    inputCount: 2,
    label: "AND",
    description: "Produce 1 solo cuando todas sus entradas están en 1.",
  },
  OR: {
    name: "OR",
    inputCount: 2,
    label: "OR",
    description: "Produce 1 cuando al menos una entrada está en 1.",
  },
  NOT: {
    name: "NOT",
    inputCount: 1,
    label: "NOT",
    description: "Invierte una entrada: 1 pasa a 0 y 0 pasa a 1.",
  },
  XOR: {
    name: "XOR",
    inputCount: 2,
    label: "XOR",
    description: "Produce 1 cuando sus entradas son diferentes.",
  },
  NAND: {
    name: "NAND",
    inputCount: 2,
    label: "NAND",
    description:
      "Es AND invertida: solo se apaga cuando todas sus entradas están en 1.",
  },
  NOR: {
    name: "NOR",
    inputCount: 2,
    label: "NOR",
    description:
      "Es OR invertida: solo se enciende cuando ninguna entrada está en 1.",
  },
  XNOR: {
    name: "XNOR",
    inputCount: 2,
    label: "XNOR",
    description: "Produce 1 cuando sus entradas son iguales.",
  },
};

export const gates = Object.values(gateDefinitions);
