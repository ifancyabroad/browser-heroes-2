import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cripple",
	name: "Cripple",
	description: "Inflict a debilitating injury that may severely weaken the enemy's attacks.",
	icon: "skills/common/cripple.png",
	pool: "common",
	kind: "technique",
	category: "debuff",
	rarity: "common",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "add",
			value: -4,
			durationTurns: 4,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
	],
	tags: [],
});
