import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "make_it_rain",
	name: "Make it Rain",
	description:
		"Rain burning ammunition over the enemy, causing an explosion followed by lingering fire.",
	icon: "skills/unique/make_it_rain.png",
	pool: "unique",
	kind: "spell",
	category: "damage",
	rarity: "rare",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			damageClass: "magical",
			dice: "6d6",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "dexterity" },
			},
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "fire",
			damageClass: "magical",
			dice: "2d6",
			duration: { unit: "turns", value: 2 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
	],
	tags: [],
});
