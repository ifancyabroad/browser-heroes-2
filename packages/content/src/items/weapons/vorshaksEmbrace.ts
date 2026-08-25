import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "vorshaks_embrace",
	name: "Vorshak's Embrace",
	description:
		"A vicious claw fashioned in Vorshak's image, feeding upon the blood it spills while tearing open wounds for the killing blow.",
	icon: "items/weapons/claws/BrassKnuckles_v2_11.png",
	price: 3200,
	rarity: "legendary",
	type: "weapon",
	weaponType: "dagger",
	handedness: "oneHanded",
	attackRange: "melee",
	damage: {
		dice: "1d4+5",
		type: "slashing",
		damageClass: "physical",
		attribute: "dexterity",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 4,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "heal",
					target: "self",
					dice: "1d6",
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
					type: "modifyDamageAffinity",
					target: "enemy",
					affinity: "vulnerability",
					operation: "add",
					damageType: "slashing",
					duration: { unit: "turns", value: 3 },
				},
			],
		},
	],
	tags: [],
});
