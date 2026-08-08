import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "rat_gods_decapitator",
	name: "Rat God's Decapitator",
	description:
		"A brutal executioner's axe sacred to the Rat God. Its jagged edge tears open mortal wounds and leaves survivors exposed to further slaughter.",
	icon: "items/weapons/axes/Axe_v2_51.png",
	price: 2600,
	rarity: "legendary",
	type: "weapon",
	weaponType: "battleaxe",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d10+5",
		type: "slashing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "criticalRangeBonus",
			value: 4,
		},
	],
	attackRiders: [
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
					type: "damageOverTime",
					target: "enemy",
					damageType: "slashing",
					dice: "2d6",
					duration: { unit: "turns", value: 3 },
				},
				{
					type: "modifyDamageAffinity",
					target: "enemy",
					affinity: "vulnerability",
					operation: "add",
					damageType: "slashing",
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
	tags: [],
});
