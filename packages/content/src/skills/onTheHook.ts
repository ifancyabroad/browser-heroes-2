import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "on_the_hook",
	name: "On the Hook",
	description: "Reduce the enemy's Armour Class on a failed Dexterity saving throw.",
	icon: "skills/unique/on_the_hook.png",
	pool: "unique",
	kind: "technique",
	category: "debuff",
	rarity: "uncommon",
	maxUses: 3,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			value: -10,
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "dexterity",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
	],
	tags: [],
});
