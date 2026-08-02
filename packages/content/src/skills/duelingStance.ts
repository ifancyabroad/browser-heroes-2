import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "dueling_stance",
	name: "Dueling Stance",
	description:
		"Adopt a defensive posture that increases armor class while slightly reducing attack power.",
	icon: "skills/warrior/dueling_stance.png",
	pool: "warrior",
	category: "buff",
	maxUses: 6,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: 10,
			durationTurns: 6,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "slashing",
			operation: "add",
			value: -25,
			durationTurns: 6,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "crushing",
			operation: "add",
			value: -25,
			durationTurns: 6,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "piercing",
			operation: "add",
			value: -25,
			durationTurns: 6,
		},
	],
	tags: [],
});
