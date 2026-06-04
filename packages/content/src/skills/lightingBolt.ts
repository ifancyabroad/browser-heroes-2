import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "mage",
	description: "Conjure a lightning bolt.",
	effects: [
		{
			damageType: "lightning",
			max: 15,
			min: 6,
			modifier: "intelligence",
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc3zPER2-voArWHwNy9?alt=media&token=6edea4db-a6d1-4951-8d0a-a67acfb4e788",
	level: 2,
	maxUses: 7,
	name: "Lighting Bolt",
	price: 280,
	id: "lighting_bolt",
});
