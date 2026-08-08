import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "earthshaking",
	name: "Earthshaking",
	position: "prefix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"], damageTypes: ["crushing"] }],
	attackRiders: [
		{
			timing: "onHit",
			effects: [{ type: "damage", target: "enemy", damageType: "crushing", dice: "1d8" }],
		},
	],
});
