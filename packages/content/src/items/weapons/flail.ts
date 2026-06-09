import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "flail",
	name: "Flail",
	description:
		"The Flail is a unique weapon consisting of a spiked ball attached to a sturdy chain, allowing for unpredictable strikes. Its design enables powerful, swinging attacks that can bypass shields and armor. Favored by agile fighters, this weapon combines versatility with a distinct flair in combat.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86LrSuGHIRtQuAJJAq?alt=media&token=910719f5-7fc8-4fbd-aa17-761da5c9ed1b",
	price: 280,
	rarity: "common",
	type: "weapon",
	weaponType: "mace",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d8",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					dice: "1d4",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
