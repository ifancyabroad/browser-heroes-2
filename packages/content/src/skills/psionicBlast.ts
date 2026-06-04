import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "necrotic",
			max: 30,
			min: 12,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 8,
			duration: 1,
			effect: "stun",
			modifier: "wisdom",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC3JZltm890qLBu0MtB?alt=media&token=004fdcea-3a31-425c-9f87-c9050ac4cb2b",
	level: 3,
	maxUses: 2,
	name: "Psionic Blast",
	price: 0,
	id: "psionic_blast",
});
