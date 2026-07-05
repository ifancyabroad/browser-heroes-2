import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "royal_mace",
	name: "Royal Mace",
	description:
		"The Royal Mace is an ornate weapon with a heavy, jewel-adorned head and intricate designs. Built for power and style, it delivers crushing blows while showcasing regal craftsmanship. Favored by nobles, this mace symbolizes authority and strength in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86KsKBT0jSbCjiSLm_?alt=media&token=f1c08b85-9650-4428-b91b-adece827d8e7",
	price: 780,
	rarity: "rare",
	type: "weapon",
	weaponType: "mace",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6+2",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "crushing",
			operation: "add",
			value: 25,
		},
	],
	attackRiders: [],
	tags: [],
});
