import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "entangling",
	name: "Entangling",
	position: "prefix",
	rarity: "rare",
	weight: 0.75,
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["flail"],
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "dexterity",
				dc: {
					base: 12,
					attribute: "dexterity",
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "attackRollBonus",
					value: -2,
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
});
