export function combineModifierValues(operation: "add" | "multiply", values: readonly number[]) {
	const identity = operation === "add" ? 0 : 1;

	return values.reduce(
		(total, value) => (operation === "add" ? total + value : total * value),
		identity,
	);
}
