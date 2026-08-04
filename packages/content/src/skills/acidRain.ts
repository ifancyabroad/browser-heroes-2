import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_rain",
	name: "Acid Rain",
	description: "Call down corrosive rain that burns the enemy and strips away armour.",
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
			durationTurns: 3,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "acid",
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
