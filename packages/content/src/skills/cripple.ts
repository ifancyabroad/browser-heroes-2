import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description:
		"Inflict debilitating injury with Cripple, weakening enemies and hindering their movements in the throes of battle.",
	effects: [
		{
			difficulty: 19,
			duration: 6,
			effect: "cripple",
			modifier: "dexterity",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhgzTUnXwX4Iw8JGJev?alt=media&token=0e42a7f5-dee5-4f7a-8366-3563b162943f",
	level: 1,
	maxUses: 6,
	name: "Cripple",
	price: 0,
	id: "cripple",
});
