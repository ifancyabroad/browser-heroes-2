import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "web",
	name: "Web",
	description:
		"Reduce the enemy's Initiative and give them disadvantage on Dexterity saving throws, each requiring a separate failed Dexterity saving throw.",
	icon: "skills/common/web.png",
	pool: "common",
	kind: "technique",
	category: "debuff",
	rarity: "rare",
	maxUses: 4,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "initiative",
			value: -4,
			duration: { unit: "battles", value: 1 },
			save: {
				attribute: "dexterity",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "savingThrow",
			attribute: "dexterity",
			mode: "disadvantage",
			duration: { unit: "battles", value: 1 },
			save: {
				attribute: "dexterity",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
	],
	tags: [],
});
