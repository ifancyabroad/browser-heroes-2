import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "puncturing",
	name: "Puncturing",
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
					damageType: "piercing",
					dice: "1d4",
				},
			],
		},
	],
});
