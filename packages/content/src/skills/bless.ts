import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description:
		"Invoke a sacred boon that grants the blessed effect, ensuring all saving throws succeed.",
	effects: [
		{
			duration: 8,
			effect: "bless",
			target: "self",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkFjgyu0pTYRw3DVD-?alt=media&token=a19ceedb-9e70-46fb-a0b1-34a68b122a7d",
	level: 1,
	maxUses: 8,
	name: "Bless",
	price: 0,
	id: "bless",
});
