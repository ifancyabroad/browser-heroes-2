import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "infused_fire_wand",
	name: "Infused Fire Wand",
	description:
		"The Infused Fire Wand is a slender, red rod crackling with flame magic. When wielded, it unleashes bursts of fire, igniting targets and dealing damage. This wand is favored by fire mages, enhancing their spellcasting with powerful flames to dominate the battlefield.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O886CfafhQSLXkJEQyF?alt=media&token=24019a7c-44f9-466c-8cf3-f7476b7ab053",
	price: 120,
	rarity: "common",
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4+1",
		type: "fire",
		attribute: "intelligence",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
