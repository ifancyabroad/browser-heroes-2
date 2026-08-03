import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "stunning",
	name: "Stunning",
	position: "prefix",
	rarity: "epic",
	weight: 0.35,
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["club", "hammer", "mace"],
			damageTypes: ["crushing"],
		},
	],
	attackRiders: [
		{
			timing: "onCrit",
			save: {
				attribute: "constitution",
				dc: {
					base: 14,
					attribute: "constitution",
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
					durationTurns: 1,
				},
			],
		},
	],
});
