import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "A basic weapon attack.",
	effects: [
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NfROP8bobODCeEQFrpd?alt=media&token=5f56ac9a-64e5-422e-89a4-a09a4c7baddb",
	level: 0,
	maxUses: 0,
	name: "Attack",
	price: 0,
	id: "attack",
});
