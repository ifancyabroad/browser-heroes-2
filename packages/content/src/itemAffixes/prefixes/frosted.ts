import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "frosted",
	name: "Frosted",
	position: "prefix",
	rarity: "uncommon",
	appliesTo: [
		{
			itemTypes: ["weapon"],
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "cold",
					dice: "1d4",
				},
			],
		},
	],
});
