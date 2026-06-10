import { ClassId } from "@app/content";
import { heroStateSchema, type HeroState } from "../schemas";

export type CreateInitialHeroStateInput = {
	heroName: string;
	classId: ClassId;
};

export function createInitialHeroState(input: CreateInitialHeroStateInput): HeroState {
	const hero: HeroState = {
		id: "player",
		name: input.heroName,
		classId: input.classId,

		level: 1,
		xp: 0,

		maxHp: 30,
		currentHp: 30,

		stats: {
			// TODO: Replace with your actual content stat shape.
			attack: 5,
			defense: 2,
			speed: 1,
		},

		skills: [],
		items: [],
	};

	return heroStateSchema.parse(hero);
}
