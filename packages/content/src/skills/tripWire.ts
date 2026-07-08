import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "trip_wire",
	name: "Trip Wire",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC-i7O51wd1ka6w8zIm?alt=media&token=6acc0c55-b2ca-4458-93b4-ace0350f3d91",
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
