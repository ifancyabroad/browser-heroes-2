import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "trip_wire",
	name: "Trip Wire",
	icon: "skills/common/trip_wire.png",
	pool: "common",
	category: "debuff",
	maxUses: 1,
	effects: [
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			durationTurns: 2,
		},
	],
	tags: [],
});
