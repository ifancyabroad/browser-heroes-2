import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "piercing",
	description:
		"The Unholy Bolter is a sinister crossbow adorned with dark symbols and a blackened finish. It fires cursed bolts that deal extra damage and drain vitality. Favored by dark sorcerers, this weapon embodies malevolence and relentless power in battle.",
	effects: [
		{
			damageType: "necrotic",
			max: 10,
			min: 4,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O839Fwy6z4MdXojSNBz?alt=media&token=6e194bb4-0ded-4bc6-9221-f52888a19361",
	level: 4,
	max: 12,
	min: 5,
	name: "Unholy Bolter",
	price: 1200,
	properties: [
		{
			name: "necrotic",
			type: "damage",
			value: 50,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "crossbow",
	id: "unholy_bolter",
});
