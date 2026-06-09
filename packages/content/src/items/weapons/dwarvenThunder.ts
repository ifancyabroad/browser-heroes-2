import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "dwarven_thunder",
	name: "Dwarven Thunder",
	description:
		"Dwarven Thunder is a sturdy warhammer with a heavy head that resonates with a deep sound upon impact. Crafted by skilled dwarven smiths, it delivers devastating blows, often stunning foes. This weapon embodies the strength and craftsmanship of dwarven warriors.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O83CckcCZNQbGuIhCwy?alt=media&token=7f94fa9c-7af4-401b-82f4-0a53766bf53c",
	price: 1440,
	rarity: "common",
	type: "weapon",
	weaponType: "hammer",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d10+4",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "lightning",
		},
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
					dice: "1d7+3",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
