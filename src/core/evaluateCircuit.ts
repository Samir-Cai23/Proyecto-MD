import type { CircuitDefinition, CircuitNode, InputStates } from './gameTypes';
import { evaluateGate } from './evaluateGate';

function evaluateNode(node: CircuitNode, inputStates: InputStates): boolean {
  if (node.type === 'input') {
    return Boolean(inputStates[node.name]);
  }

  return evaluateGate(
    node.gate,
    node.inputs.map((input) => evaluateNode(input, inputStates)),
  );
}

export function evaluateCircuit(circuit: CircuitDefinition, inputStates: InputStates): boolean {
  return evaluateNode(circuit.output, inputStates);
}
