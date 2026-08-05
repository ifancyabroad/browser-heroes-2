import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "drain_energy",
	name: "Drain Energy",
	description:
		"Steal the enemy's vigour to fortify yourself while weakening the force of their attacks and magic.",
	icon: "skills/occultist/drain_energy.png",
	pool: "occultist",
	kind: "spell",
	category: "debuff",
	rarity: "uncommon",
	maxUses: 3,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "maxHpBonus",
			value: 20,
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.75,
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
