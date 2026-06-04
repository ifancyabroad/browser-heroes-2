import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			max: 50,
			min: 20,
			target: "self",
			type: "heal",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJvsz-cgkVxZDlPuMY?alt=media&token=97b401ea-d6db-44bd-afd5-6e55d5de18bd",
	level: 4,
	maxUses: 1,
	name: "Reassemble",
	price: 0,
	id: "reassemble",
});
