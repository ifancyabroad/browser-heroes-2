import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			damageType: "necrotic",
			max: 50,
			min: 20,
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "fire",
			max: 50,
			min: 20,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCIAJrIHwRDdKdzqtlj?alt=media&token=36a41337-d39d-4b6e-8b0f-c67a945b2cf9",
	level: 4,
	maxUses: 1,
	name: "Binkus' Deathray",
	price: 0,
	id: "binkus_deathray",
});
