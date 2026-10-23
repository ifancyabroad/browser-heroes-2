import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "petrifying_gaze",
	name: "Petrifying Gaze",
	description: "Stun the enemy on a failed Constitution saving throw.",
	icon: "skills/common/petrifying_gaze.png",
	pool: "common",
	kind: "technique",
	category: "debuff",
	rarity: "rare",
	maxUses: 1,
	effects: [
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			duration: { unit: "turns", value: 2 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "constitution", bonus: 2 },
			},
		},
	],
	tags: [],
});
