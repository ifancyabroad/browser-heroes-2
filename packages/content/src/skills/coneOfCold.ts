import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cone_of_cold",
	name: "Cone of Cold",
	description: "Unleash a frigid blast that damages the enemy and numbs their attacks.",
	icon: "skills/wizard/cone_of_cold.png",
	pool: "wizard",
	kind: "spell",
	category: "damage",
	rarity: "rare",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "cold",
			damageClass: "magical",
			dice: "6d6",
			attribute: "intelligence",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: { attribute: "intelligence" },
			},
		},
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			duration: { unit: "turns", value: 2 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "intelligence" },
			},
		},
	],
	tags: [],
});
