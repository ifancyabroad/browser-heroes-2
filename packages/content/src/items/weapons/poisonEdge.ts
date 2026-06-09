import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "poison_edge",
	name: "Poison Edge",
	description:
		"The Poison Edge is a sleek, dark blade with a subtle green hue, designed to deliver swift, deadly strikes. Coated in a potent toxin, each cut can inflict lingering damage on foes. Favored by assassins, this weapon combines elegance with a lethal touch, perfect for stealthy eliminations.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O4aAUt64OLYAgUJYhxR?alt=media&token=5bf2752f-d99f-452e-b948-af4ac666ad79",
	price: 700,
	rarity: "common",
	type: "weapon",
	weaponType: "dagger",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d4+2",
		type: "slashing",
		attribute: "dexterity",
	},
	modifiers: [],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "constitution",
				dc: {
					base: 14,
					attribute: "constitution",
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poisoned",
					durationTurns: 4,
				},
			],
		},
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "poison",
					dice: "1d6",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
