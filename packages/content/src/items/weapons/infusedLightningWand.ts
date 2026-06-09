import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "infused_lightning_wand",
	name: "Infused Lightning Wand",
	description:
		"The Infused Lightning Wand is a sleek, silver rod pulsating with electric energy. When wielded, it releases arcs of lightning that can stun foes and deal damage. This wand is favored by storm mages, enhancing their ability to unleash powerful lightning spells in combat.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O886X4ak1ZP3ovLQjeF?alt=media&token=5863ce10-3c44-4d5c-aae5-37bd250bd151",
	price: 120,
	rarity: "common",
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4+1",
		type: "lightning",
		attribute: "intelligence",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
