import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warlock",
	description:
		"Fire a bolt of necrotic energy that deals damage and may curse your enemy, forcing them to fail any saving throws.",
	effects: [
		{
			damageType: "necrotic",
			max: 15,
			min: 6,
			modifier: "intelligence",
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 12,
			duration: 4,
			effect: "curse",
			modifier: "intelligence",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI67rREICWMb5bjvOvp?alt=media&token=eded7969-71c0-4b48-b823-6be559332758",
	level: 2,
	maxUses: 4,
	name: "Cursing Bolt",
	price: 0,
	id: "cursing_bolt",
});
