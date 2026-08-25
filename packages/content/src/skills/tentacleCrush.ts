import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "tentacle_crush",
	name: "Tentacle Crush",
	description: "Crush the enemy in a massive tentacle, damaging and weakening them.",
	icon: "skills/common/tentacle_crush.png",
	pool: "common",
	kind: "technique",
	category: "damage",
	rarity: "epic",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			damageClass: "physical",
			dice: "3d10",
			requiresAttackRoll: false,
			save: {
				attribute: "strength",
				onSuccess: "halfDamage",
				dc: {
					base: 8,
					attribute: "strength",
					includeProficiency: true,
					bonus: 3,
				},
			},
		},
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.75,
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "strength",
				onSuccess: "noEffect",
				dc: { attribute: "strength" },
			},
		},
	],
	tags: [],
});
