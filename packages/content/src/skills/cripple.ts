import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cripple",
	name: "Cripple",
	description:
		"Inflict debilitating injury with Cripple, weakening enemies and hindering their movements in the throes of battle.",
	icon: "skills/common/cripple.png",
	pool: "common",
	kind: "technique",
	category: "debuff",
	maxUses: 6,
	effects: [
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.75,
			durationTurns: 6,
		},
	],
	tags: [],
});
