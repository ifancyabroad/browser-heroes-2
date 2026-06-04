import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "rogue",
	description:
		"Set a hidden trap that delivers piercing and cold damage, with a chance to cripple the target.",
	effects: [
		{
			difficulty: 17,
			duration: 4,
			effect: "cripple",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
		{
			damageType: "piercing",
			max: 10,
			min: 4,
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "cold",
			max: 10,
			min: 4,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI1VwY0fN4xIxu8QMC2?alt=media&token=d4634e0e-8f48-49ca-9503-0a1550c5e99c",
	level: 2,
	maxUses: 4,
	name: "Frost Trap",
	price: 0,
	id: "frost_trap",
});
