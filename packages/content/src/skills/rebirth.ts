import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			max: 100,
			min: 100,
			target: "self",
			type: "heal",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCjRoh79ZTFYmagQ6I1?alt=media&token=fd1da8c1-de4c-4272-8474-4cbb77a5b9a0",
	level: 4,
	maxUses: 1,
	name: "Rebirth",
	price: 0,
	id: "rebirth",
});
