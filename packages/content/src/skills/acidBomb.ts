import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_bomb",
	name: "Acid Bomb",
	description: "Throw a bomb of corrosive acid at the enemy.",
	icon: "skills/rogue/acid_bomb.png",
	pool: "rogue",
	kind: "technique",
	category: "damage",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "2d10+3",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "acid",
			dice: "2d10+3",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
