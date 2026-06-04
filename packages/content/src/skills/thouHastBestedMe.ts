import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			damageType: "radiant",
			max: 20,
			min: 20,
			target: "self",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC-cCZyaJMimX-Com7R?alt=media&token=67620207-c2bb-4090-808d-9035194397c5",
	level: 1,
	maxUses: 5,
	name: "Thou Hast Bested Me",
	price: 0,
	id: "thou_hast_bested_me",
});
