import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "occultist",
	description:
		"Summon a bolt of lightning from the heavens to strike your target with electrifying force.",
	effects: [
		{
			damageType: "lightning",
			max: 20,
			min: 8,
			modifier: "wisdom",
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI6F5twLiJIL3ZO7bdu?alt=media&token=c2458ca7-b772-4e17-bbdc-ee5b2c56413c",
	level: 3,
	maxUses: 4,
	name: "Call Lightning",
	price: 0,
	id: "call_lightning",
});
