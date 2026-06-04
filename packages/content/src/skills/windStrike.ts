import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			damageType: "lightning",
			max: 20,
			min: 8,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC4aGSePG9PEzPMvMY-?alt=media&token=f04e8fec-7606-46c7-ad08-2c97af064b3e",
	level: 3,
	maxUses: 4,
	name: "Wind Strike",
	price: 0,
	id: "wind_strike",
});
