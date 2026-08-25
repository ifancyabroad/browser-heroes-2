import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "acid_edge",
	name: "Acid Edge",
	description:
		"The Acid Edge is a wickedly curved blade coated with a corrosive substance that glows faintly green. Designed for swift strikes, it can melt through armor and inflict lingering damage. Favored by assassins and alchemists, this weapon combines lethality with a sinister touch.",
	icon: "items/weapons/axes/Axe_v2_48.png",
	price: 2900,
	rarity: "legendary",
	type: "weapon",
	weaponType: "handaxe",
	handedness: "oneHanded",
	attackRange: "melee",
	damage: {
		dice: "1d6+4",
		type: "slashing",
		damageClass: "physical",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "acid",
			operation: "add",
			value: 5,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
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
					damageType: "acid",
					damageClass: "magical",
					dice: "2d4",
					duration: { unit: "turns", value: 3 },
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					value: -2,
					duration: { unit: "turns", value: 3 },
				},
			],
		},
	],
	tags: [],
});
