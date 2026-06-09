import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "flame_tipped_spear",
	name: "Flame Tipped Spear",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsjLqbIj2xZ4VHkGai?alt=media&token=1c5af965-eb69-4e14-af6f-7ea747cbff3c",
	price: 180,
	rarity: "common",
	type: "weapon",
	weaponType: "spear",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+1",
		type: "piercing",
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
					damageType: "fire",
					dice: "1d6",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
