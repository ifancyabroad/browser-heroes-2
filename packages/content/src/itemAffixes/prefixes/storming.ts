import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "storming",
	name: "Storming",
	position: "prefix",
	rarity: "uncommon",
	appliesTo: {
		itemTypes: ["weapon"],
	},
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "lightning",
					dice: "1d4",
				},
			],
		},
	],
});
