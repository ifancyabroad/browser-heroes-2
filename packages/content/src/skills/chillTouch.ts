import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "chill_touch",
	name: "Chill Touch",
	description:
		"Deal cold damage to the enemy, halved on a successful Constitution saving throw. A separate failed Constitution saving throw prevents them from healing for the current battle.",
	icon: "skills/occultist/chill_touch.png",
	pool: "occultist",
	kind: "spell",
	category: "damage",
	rarity: "uncommon",
	maxUses: 6,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "cold",
			damageClass: "magical",
			attackRange: "melee",
			dice: "4d6",
			attribute: "wisdom",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: { attribute: "wisdom" },
			},
		},
		{
			type: "modifyHealing",
			target: "enemy",
			multiplier: 0,
			duration: { unit: "battles", value: 1 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "wisdom" },
			},
		},
	],
	tags: [],
});
