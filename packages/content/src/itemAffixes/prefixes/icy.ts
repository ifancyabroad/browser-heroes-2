import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "icy",
	name: "Icy",
	position: "prefix",
	rarity: "rare",
	weight: 0.75,
	appliesTo: [{ itemTypes: ["weapon"] }],
	attackRiders: [
		{
			timing: "onHit",
			effects: [{ type: "damage", target: "enemy", damageType: "cold", dice: "1d6" }],
		},
	],
});
