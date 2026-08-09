import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "dwarven_thunder",
	name: "Dwarven Thunder",
	description:
		"Dwarven Thunder is a sturdy warhammer with a heavy head that resonates with a deep sound upon impact. Crafted by skilled dwarven smiths, it delivers devastating blows, often stunning foes. This weapon embodies the strength and craftsmanship of dwarven warriors.",
	icon: "items/weapons/hammers/Hammer_v2_14.png",
	price: 4900,
	rarity: "legendary",
	type: "weapon",
	weaponType: "warhammer",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d10+4",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "add",
			value: 5,
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
					dice: "2d8",
					requiresAttackRoll: false,
				},
			],
		},
		{
			timing: "onCrit",
			save: {
				attribute: "constitution",
				dc: {
					base: 18,
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "stunned",
					duration: { unit: "turns", value: 1 },
				},
			],
		},
	],
	tags: [],
});
