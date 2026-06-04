import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "occultist",
	description:
		"Unleash necrotic energy to damage your enemy while siphoning their life force to restore your own health.",
	effects: [
		{
			damageType: "necrotic",
			max: 15,
			min: 6,
			modifier: "wisdom",
			target: "enemy",
			type: "damage",
		},
		{
			max: 15,
			min: 6,
			modifier: "wisdom",
			target: "self",
			type: "heal",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTbEHpokQy-0H5xsHh?alt=media&token=e978b5e3-acb5-417a-b99d-377658894756",
	level: 4,
	maxUses: 2,
	name: "Drain Life",
	price: 0,
	id: "drain_life",
});
