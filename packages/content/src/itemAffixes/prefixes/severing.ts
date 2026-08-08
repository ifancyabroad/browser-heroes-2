import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "severing",
	name: "Severing",
	position: "prefix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"], damageTypes: ["slashing"] }],
	attackRiders: [
		{
			timing: "onHit",
			effects: [{ type: "damage", target: "enemy", damageType: "slashing", dice: "1d8" }],
		},
	],
});
