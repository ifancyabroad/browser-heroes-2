import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "rogue",
	description: "Unleash a rapid series of strikes, overwhelming your enemy with speed and force.",
	effects: [
		{
			multiplier: 0.5,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			multiplier: 0.5,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			multiplier: 0.5,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			multiplier: 0.5,
			target: "enemy",
			type: "weaponDamage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqcxgP5ITgFn-T8xj6?alt=media&token=2ccf3d59-a4f4-41ce-ba9b-7e9fccac6a6d",
	level: 4,
	maxUses: 2,
	name: "Flurry",
	price: 550,
	id: "flurry",
});
