import { heroNamePools } from "./heroNamePools";

function pick<T>(options: readonly T[]): T {
	return options[Math.floor(Math.random() * options.length)]!;
}

export function generateHeroName(): string {
	// Choose a sound palette evenly, independently of its number of combinations.
	const pool = pick(heroNamePools);
	const start = pick(pool.starts);
	const middle = Math.random() < 0.35 ? "" : pick(pool.middles);
	const name = `${start}${middle}${pick(pool.endings)}`;

	return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}
