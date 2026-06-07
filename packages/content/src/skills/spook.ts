import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "spook",
	name: "Spook",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9Fao6yVdkld7nZuuMv?alt=media&token=dd91773f-d1d0-4730-9dfb-cb730185be98",
	pool: "common",
	category: "spell",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 4,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "necrotic",
					dice: "1d6",
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "necrotic",
					dice: "2d6-2",
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "necrotic",
					dice: "2d6",
				},
			],
		},
	],
	tags: [],
});
