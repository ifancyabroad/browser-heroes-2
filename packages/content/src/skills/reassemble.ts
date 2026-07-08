import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "reassemble",
	name: "Reassemble",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJvsz-cgkVxZDlPuMY?alt=media&token=97b401ea-d6db-44bd-afd5-6e55d5de18bd",
	pool: "common",
	category: "heal",
	maxUses: 1,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "3d12+16",
		},
	],
	tags: [],
});
