import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			damageType: "necrotic",
			max: 30,
			min: 12,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 17,
			duration: 2,
			effect: "stun",
			modifier: "wisdom",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkZb3a3j2ykQWUtTC0?alt=media&token=068e6888-9b67-4aca-bce4-d315299e625a",
	level: 3,
	maxUses: 1,
	name: "Wail",
	price: 0,
	id: "wail",
});
