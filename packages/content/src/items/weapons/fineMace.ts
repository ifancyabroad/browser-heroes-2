import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "fine_mace",
	name: "Fine Mace",
	description:
		"The Fine Mace features a polished, heavy head with ornate details, designed for powerful strikes. Its sturdy handle ensures a strong grip, making it effective in combat. This mace combines elegance and functionality, appealing to warriors who value craftsmanship.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgO1zYRL8NINq5O1XvX?alt=media&token=18afa312-c74c-46d1-acaf-afe3d88ca214",
	price: 100,
	rarity: "common",
	type: "weapon",
	weaponType: "mace",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6+1",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
