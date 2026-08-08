import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "sundering",
	name: "Sundering",
	position: "prefix",
	rarity: "rare",
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: [
				"battleaxe",
				"crossbow",
				"greatclub",
				"greatsword",
				"warhammer",
				"mace",
				"morningstar",
				"flail",
			],
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "dexterity",
				dc: {
					base: 15,
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "modifyDamageTaken",
					target: "enemy",
					operation: "multiply",
					value: 1.25,
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
});
