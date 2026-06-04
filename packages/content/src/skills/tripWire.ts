import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			difficulty: 18,
			duration: 2,
			effect: "stun",
			modifier: "dexterity",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC-i7O51wd1ka6w8zIm?alt=media&token=6acc0c55-b2ca-4458-93b4-ace0350f3d91",
	level: 2,
	maxUses: 1,
	name: "Trip Wire",
	price: 0,
	id: "trip_wire",
});
