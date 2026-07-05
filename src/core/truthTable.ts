import type { CircuitDefinition, InputName, InputStates, TruthTableRow } from './gameTypes';
import { evaluateCircuit } from './evaluateCircuit';

function generateInputCombinations(inputs: InputName[], index = 0, current: InputStates = {}): InputStates[] {
  if (index >= inputs.length) {
    return [{ ...current }];
  }

  const input = inputs[index];

  return [
    ...generateInputCombinations(inputs, index + 1, { ...current, [input]: false }),
    ...generateInputCombinations(inputs, index + 1, { ...current, [input]: true }),
  ];
}

export function generateTruthTable(circuit: CircuitDefinition): TruthTableRow[] {
  return generateInputCombinations(circuit.inputs).map((inputs) => ({
    inputs,
    output: evaluateCircuit(circuit, inputs),
  }));
}
