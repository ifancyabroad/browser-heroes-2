import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "poison",
			max: 20,
			min: 8,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 16,
			duration: 4,
			effect: "poison",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9_dP0Qn57Vq0CTiSVO?alt=media&token=586dc311-85ef-4c5d-88b3-93a36aaf845b",
	level: 3,
	maxUses: 2,
	name: "Disease Shot",
	price: 0,
	id: "disease_shot",
});
