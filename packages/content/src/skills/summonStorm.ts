import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			damageType: "lightning",
			max: 60,
			min: 30,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC4v4pMGZ1Llq1EBU66?alt=media&token=f7c02506-ce17-4908-8ef2-6f850ff7c328",
	level: 4,
	maxUses: 1,
	name: "Summon Storm",
	price: 0,
	id: "summon_storm",
});
