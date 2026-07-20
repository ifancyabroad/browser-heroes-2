import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "necrotic",
	name: "Necrotic",
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
					damageType: "necrotic",
					dice: "1d4",
				},
			],
		},
	],
});
