import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "marked_for_death",
	name: "Marked for Death",
	description:
		"Increase all damage the enemy takes by 25% for 3 battles on a failed Wisdom saving throw.",
	icon: "skills/unique/marked_for_death.png",
	pool: "unique",
	kind: "spell",
	category: "debuff",
	rarity: "epic",
	maxUses: 1,
	effects: [
		{
			type: "modifyDamageTaken",
			target: "enemy",
			operation: "multiply",
			value: 1.5,
			duration: { unit: "battles", value: 3 },
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "wisdom" },
			},
		},
	],
	tags: [],
});
