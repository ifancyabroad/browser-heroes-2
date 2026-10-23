import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "trip_wire",
	name: "Trip Wire",
	description: "Stun the enemy on a failed Dexterity saving throw.",
	icon: "skills/common/trip_wire.png",
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
				attribute: "dexterity",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
	],
	tags: [],
});
