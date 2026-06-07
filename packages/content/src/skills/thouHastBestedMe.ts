import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "thou_hast_bested_me",
	name: "Thou Hast Bested Me",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC-cCZyaJMimX-Com7R?alt=media&token=67620207-c2bb-4090-808d-9035194397c5",
	pool: "unique",
	category: "spell",
	usage: {
		target: "self",
		requiresAttackRoll: false,
		maxUses: 5,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "self",
					damageType: "radiant",
					dice: "5d6+3",
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "damage",
					target: "self",
					damageType: "radiant",
					dice: "8d6+1",
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "damage",
					target: "self",
					damageType: "radiant",
					dice: "10d6+3",
				},
			],
		},
	],
	tags: [],
});
