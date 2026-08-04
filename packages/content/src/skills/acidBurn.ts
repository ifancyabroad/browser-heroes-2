import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_burn",
	name: "Acid Burn",
	description: "Douse the enemy in clinging acid that continues to burn through them.",
	icon: "skills/thief/acid_burn.png",
	pool: "thief",
	kind: "technique",
	category: "debuff",
	rarity: "uncommon",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "acid",
			dice: "2d6",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "dexterity" },
			},
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			value: -3,
			durationTurns: 2,
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "acid",
			dice: "1d6",
			durationTurns: 3,
		},
	],
	tags: [],
});
