import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "fire_wand",
	name: "Fire Wand",
	description:
		"The Fire Wand is a slender, crimson rod, warm to the touch and inscribed with glowing ember runes. It unleashes bursts of flame, igniting targets from a distance. Favored by fire mages, it crackles softly, hinting at the intense heat it can unleash in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O8858iCEuFLCYHw_B8r?alt=media&token=c4b6372c-c137-4609-a2e1-1fbedf1c903a",
	price: 60,
	rarity: "common",
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4",
		type: "fire",
		attribute: "intelligence",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
