import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "lightning_trident",
	name: "Lightning Trident",
	description:
		"The Lightning Trident is a formidable weapon with three sharp prongs that shimmer with electric energy. Designed for both melee combat and throwing, it can unleash arcs of lightning upon impact. Favored by storm warriors, this trident embodies the raw power of thunderstorms in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86ft0iHPkB35cl2T2l?alt=media&token=3bcaa4f0-b2fd-4b69-8fae-236448374d9d",
	price: 1260,
	rarity: "epic",
	type: "weapon",
	weaponType: "spear",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+4",
		type: "piercing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "add",
			value: 50,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "lightning",
					dice: "1d8+3",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
