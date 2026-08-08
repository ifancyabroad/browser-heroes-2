import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "doomseers_wand",
	name: "Doomseer's Wand",
	description:
		"A wand carved for prophets of ruin, clouding its victims' attacks with visions of doom before exposing them to deathly magic.",
	icon: "items/weapons/wands/Wand_v2_42.png",
	price: 3600,
	rarity: "legendary",
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4+5",
		type: "necrotic",
		attribute: "wisdom",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 5,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "wisdom",
				dc: {
					base: 18,
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "modifyRoll",
					target: "enemy",
					roll: "attack",
					mode: "disadvantage",
					duration: { unit: "turns", value: 2 },
				},
			],
		},
		{
			timing: "onCrit",
			save: {
				attribute: "wisdom",
				dc: {
					base: 18,
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "modifyDamageAffinity",
					target: "enemy",
					affinity: "vulnerability",
					operation: "add",
					damageType: "necrotic",
					duration: { unit: "turns", value: 3 },
				},
			],
		},
	],
	tags: [],
});
