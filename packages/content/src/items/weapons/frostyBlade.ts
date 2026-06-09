import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "frosty_blade",
	name: "Frosty Blade",
	description:
		"The Frosty Blade is a shimmering sword with a blue-tinted edge that emanates a chilling aura. Designed to freeze foes on contact, it deals both slashing damage and frost damage. This blade is favored by frost mages and warriors alike, bringing the bite of winter to the battlefield.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86hk29tvN6eTdWSBiu?alt=media&token=22dcddb9-3846-4158-845c-570ec0506462",
	price: 620,
	rarity: "common",
	type: "weapon",
	weaponType: "sword",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6+2",
		type: "slashing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "cold",
			operation: "add",
			value: 20,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "cold",
					dice: "1d6",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
