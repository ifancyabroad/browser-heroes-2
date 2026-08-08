import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "serrated",
	name: "Serrated",
	position: "prefix",
	rarity: "rare",
	weight: 0.75,
	appliesTo: [{ itemTypes: ["weapon"], damageTypes: ["slashing"] }],
	attackRiders: [
		{
			timing: "onHit",
			effects: [{ type: "damage", target: "enemy", damageType: "slashing", dice: "1d6" }],
		},
	],
});
