export type RngState = string;

export type RngResult<T> = {
	value: T;
	rngState: RngState;
};

/**
 * Temporary deterministic RNG helper.
 *
 * This is intentionally simple for now. Later you can replace the internals
 * with a better seeded RNG without changing the calling pattern.
 */
export function randomFloat(rngState: RngState): RngResult<number> {
	const next = nextSeed(rngState);

	return {
		value: numberFromSeed(next),
		rngState: next,
	};
}

export function randomInt(
	rngState: RngState,
	minInclusive: number,
	maxInclusive: number,
): RngResult<number> {
	const result = randomFloat(rngState);

	const value = Math.floor(result.value * (maxInclusive - minInclusive + 1)) + minInclusive;

	return {
		value,
		rngState: result.rngState,
	};
}

export function randomChance(rngState: RngState, chance: number): RngResult<boolean> {
	const result = randomFloat(rngState);

	return {
		value: result.value < chance,
		rngState: result.rngState,
	};
}

function nextSeed(seed: string): string {
	let hash = 0;

	for (let i = 0; i < seed.length; i += 1) {
		hash = (hash * 31 + seed.charCodeAt(i)) | 0;
	}

	const next = Math.abs(hash + 1).toString();

	return next;
}

function numberFromSeed(seed: string): number {
	const numeric = Number(seed) || 1;

	return (numeric % 10_000) / 10_000;
}
