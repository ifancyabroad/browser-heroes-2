import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "charged_dagger",
	name: "Charged Dagger",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsfPOdP32ZXlykBQ1E?alt=media&token=441c467f-76fd-4b6a-be70-52299e40a1a0",
	price: 160,
	rarity: "uncommon",
	type: "weapon",
	weaponType: "dagger",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d4+1",
		type: "slashing",
		attribute: "dexterity",
	},
	modifiers: [],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "lightning",
					dice: "1d4",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
