import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "barbarian",
	description:
		"Launch a fierce attack combining fire and crushing damage, with a risk of leaving yourself stunned.",
	effects: [
		{
			difficulty: 12,
			duration: 1,
			effect: "stun",
			modifier: "constitution",
			target: "self",
			type: "auxiliary",
		},
		{
			damageType: "crushing",
			max: 20,
			min: 8,
			modifier: "strength",
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "fire",
			max: 20,
			min: 8,
			modifier: "strength",
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OHyIphJAxFajeUy4Ru1?alt=media&token=ff9a0bae-c3b9-467a-a907-426e8444107b",
	level: 4,
	maxUses: 2,
	name: "Reckless Assault",
	price: 0,
	id: "reckless_assault",
});
