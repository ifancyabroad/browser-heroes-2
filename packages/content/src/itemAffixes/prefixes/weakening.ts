import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "weakening",
	name: "Weakening",
	position: "prefix",
	rarity: "rare",
	weight: 0.75,
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["dagger", "staff"],
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "constitution",
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
					operation: "add",
					value: -2,
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
});
