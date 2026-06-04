import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "mage",
	description: "Summon three piercing projectiles to launch at the enemy.",
	effects: [
		{
			damageType: "piercing",
			max: 6,
			min: 1,
			modifier: "intelligence",
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "piercing",
			max: 6,
			min: 1,
			modifier: "intelligence",
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "piercing",
			max: 6,
			min: 1,
			modifier: "intelligence",
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc3yZ_5d4QQI4y90Inu?alt=media&token=494feabb-a251-4b55-afb0-0194a5b4000a",
	level: 3,
	maxUses: 7,
	name: "Magic Missiles",
	price: 280,
	id: "magic_missiles",
});
