import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "crushing",
			max: 30,
			min: 12,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 14,
			duration: 1,
			effect: "stun",
			modifier: "strength",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OBGPUhNeKidpE71VeJ3?alt=media&token=2bfccf37-afd1-4916-81bf-03a20675d15f",
	level: 4,
	maxUses: 1,
	name: "Tentacle Wrap",
	price: 0,
	id: "tentacle_wrap",
});
