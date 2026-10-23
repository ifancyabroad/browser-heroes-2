import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_rain",
	name: "Acid Rain",
	description: "Reduce the enemy's Armour Class and deal acid damage to them.",
	icon: "skills/wizard/acid_rain.png",
	pool: "wizard",
	kind: "spell",
	category: "damage",
	rarity: "common",
	maxUses: 6,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			value: -3,
			duration: { unit: "turns", value: 3 },
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "acid",
			damageClass: "magical",
			dice: "2d6",
			attribute: "intelligence",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "intelligence" },
			},
		},
	],
	tags: [],
});
