import { HERO_NAME_MAX_LENGTH, HERO_NAME_PATTERN } from "@app/shared";

export function isValidHeroNameShape(heroName: string): boolean {
	const trimmedName = heroName.trim();

	return (
		trimmedName.length > 0 &&
		trimmedName.length <= HERO_NAME_MAX_LENGTH &&
		HERO_NAME_PATTERN.test(trimmedName)
	);
}
