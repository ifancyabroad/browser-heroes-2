import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "silencing",
	name: "Silencing",
	position: "prefix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: {
		itemTypes: ["weapon"],
		weaponTypes: ["dagger", "staff", "wand"],
	},
	attackRiders: [
		{
			timing: "onCrit",
			save: {
				attribute: "wisdom",
				dc: {
					base: 14,
					attribute: "wisdom",
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
					durationTurns: 2,
				},
			],
		},
	],
});
