export type Difficulty = "easy" | "hard";

export type InputName = "A" | "B" | "C" | "D";

export type GateName = "AND" | "OR" | "NOT" | "XOR" | "NAND" | "NOR" | "XNOR";

export type InputStates = Partial<Record<InputName, boolean>>;

export type CircuitInputNode = {
  type: "input";
  name: InputName;
};

export type CircuitGateNode = {
  type: "gate";
  gate: GateName;
  inputs: CircuitNode[];
};

export type CircuitNode = CircuitInputNode | CircuitGateNode;

export type CircuitDefinition = {
  inputs: InputName[];
  output: CircuitNode;
};

export type LevelId = `${Difficulty}-${number}`;

export type LevelDefinition = {
  id: LevelId;
  difficulty: Difficulty;
  levelNumber: number;
  title: string;
  inputs: InputName[];
  gates: GateName[];
  circuit: CircuitDefinition;
  feedbackCorrect: string;
  feedbackIncorrect: string;
  initialInputStates?: InputStates;
};

export type LevelsByDifficulty = Record<
  Difficulty,
  Record<number, LevelDefinition>
>;

export type TruthTableRow = {
  inputs: InputStates;
  output: boolean;
};
