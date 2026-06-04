import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description:
		"The Royal Mace is an ornate weapon with a heavy, jewel-adorned head and intricate designs. Built for power and style, it delivers crushing blows while showcasing regal craftsmanship. Favored by nobles, this mace symbolizes authority and strength in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86KsKBT0jSbCjiSLm_?alt=media&token=f1c08b85-9650-4428-b91b-adece827d8e7",
	level: 3,
	max: 8,
	min: 3,
	name: "Royal Mace",
	price: 780,
	properties: [
		{
			name: "crushing",
			type: "damage",
			value: 25,
		},
	],
	size: "oneHanded",
	type: "weapon",
	weaponType: "mace",
	id: "royal_mace",
});
