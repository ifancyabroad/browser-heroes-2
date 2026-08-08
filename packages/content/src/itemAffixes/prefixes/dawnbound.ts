import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "dawnbound",
	name: "Dawnbound",
	position: "prefix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"] }],
	attackRiders: [
		{
			timing: "onHit",
			effects: [{ type: "damage", target: "enemy", damageType: "radiant", dice: "1d8" }],
		},
	],
});
