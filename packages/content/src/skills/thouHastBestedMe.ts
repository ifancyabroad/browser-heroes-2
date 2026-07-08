import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "thou_hast_bested_me",
	name: "Thou Hast Bested Me",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC-cCZyaJMimX-Com7R?alt=media&token=67620207-c2bb-4090-808d-9035194397c5",
	pool: "unique",
	category: "spell",
	maxUses: 5,
	effects: [
		{
			type: "damage",
			target: "self",
			damageType: "radiant",
			dice: "5d6+3",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
