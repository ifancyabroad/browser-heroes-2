import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "necrotic",
			max: 6,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9Fao6yVdkld7nZuuMv?alt=media&token=dd91773f-d1d0-4730-9dfb-cb730185be98",
	level: 1,
	maxUses: 4,
	name: "Spook",
	price: 0,
	id: "spook",
});
