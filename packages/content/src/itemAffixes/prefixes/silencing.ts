import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "silencing",
	name: "Silencing",
	position: "prefix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["dagger", "wand"],
		},
	],
	attackRiders: [
		{
			timing: "onCrit",
			save: {
				attribute: "wisdom",
				dc: {
					base: 17,
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "silenced",
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
});
