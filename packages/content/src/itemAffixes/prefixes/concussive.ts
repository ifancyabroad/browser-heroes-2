import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "concussive",
	name: "Concussive",
	position: "prefix",
	rarity: "uncommon",
	appliesTo: {
		itemTypes: ["weapon"],
		damageTypes: ["crushing"],
	},
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "1d4",
				},
			],
		},
	],
});
