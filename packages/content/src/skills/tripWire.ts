import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "trip_wire",
	name: "Trip Wire",
	description: "Catch the enemy in a concealed wire that may send them crashing to the ground.",
	icon: "skills/common/trip_wire.png",
	pool: "common",
	kind: "technique",
	category: "debuff",
	rarity: "uncommon",
	maxUses: 1,
	effects: [
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			durationTurns: 2,
			save: {
				attribute: "dexterity",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
	],
	tags: [],
});
