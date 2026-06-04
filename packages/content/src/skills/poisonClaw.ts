import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "poison",
			max: 4,
			min: 1,
			target: "enemy",
			type: "damage",
		},
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9eQx8AckjJR4EGe9i3?alt=media&token=30cb17bb-8570-4a33-bd25-58c19d54a370",
	level: 1,
	maxUses: 6,
	name: "Poison Claw",
	price: 0,
	id: "poison_claw",
});
