import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "boon_of_the_dawnflame",
	name: "Boon of the Dawnflame",
	icon: "skills/unique/boon_of_the_dawnflame.png",
	pool: "unique",
	kind: "spell",
	category: "buff",
	maxUses: 1,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "radiant",
			operation: "add",
			value: 50,
			durationTurns: 6,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "fire",
			operation: "add",
			value: 50,
			durationTurns: 6,
		},
	],
	tags: [],
});
