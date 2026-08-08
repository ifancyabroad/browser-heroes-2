import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "enfeebling",
	name: "Enfeebling",
	position: "prefix",
	rarity: "rare",
	weight: 0.75,
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["staff"],
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "wisdom",
				dc: {
					base: 15,
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "modifyDamage",
					target: "enemy",
					operation: "multiply",
					value: 0.75,
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
});
