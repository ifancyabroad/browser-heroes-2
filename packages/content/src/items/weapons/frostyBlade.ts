import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description:
		"The Frosty Blade is a shimmering sword with a blue-tinted edge that emanates a chilling aura. Designed to freeze foes on contact, it deals both slashing damage and frost damage. This blade is favored by frost mages and warriors alike, bringing the bite of winter to the battlefield.",
	effects: [
		{
			damageType: "cold",
			max: 6,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86hk29tvN6eTdWSBiu?alt=media&token=22dcddb9-3846-4158-845c-570ec0506462",
	level: 3,
	max: 8,
	min: 3,
	name: "Frosty Blade",
	price: 620,
	properties: [
		{
			name: "cold",
			type: "damage",
			value: 20,
		},
	],
	size: "oneHanded",
	type: "weapon",
	weaponType: "sword",
	id: "frosty_blade",
});
