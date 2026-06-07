export type RngState = {
	value: number;
};

export type RngResult<T> = {
	value: T;
	rngState: RngState;
};

export function createInitialRngState(seed: string): RngState {
	return {
		value: hashSeed(seed),
	};
}

export function randomFloat(rngState: RngState): RngResult<number> {
	const nextState = nextRngState(rngState);

	return {
		value: nextState.value / 4294967296,
		rngState: nextState,
	};
}

export function randomInt(
	rngState: RngState,
	minInclusive: number,
	maxInclusive: number,
): RngResult<number> {
	const roll = randomFloat(rngState);

	const value = Math.floor(roll.value * (maxInclusive - minInclusive + 1)) + minInclusive;

	return {
		value,
		rngState: roll.rngState,
	};
}

function nextRngState(rngState: RngState): RngState {
	let t = rngState.value + 0x6d2b79f5;

	t = Math.imul(t ^ (t >>> 15), t | 1);
	t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

	return {
		value: (t ^ (t >>> 14)) >>> 0,
	};
}

function hashSeed(seed: string): number {
	let hash = 2166136261;

	for (let i = 0; i < seed.length; i += 1) {
		hash ^= seed.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}

	return hash >>> 0;
}
