import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "pulverising",
	name: "Pulverising",
	position: "prefix",
	rarity: "rare",
	weight: 0.75,
	appliesTo: [{ itemTypes: ["weapon"], damageTypes: ["crushing"] }],
	attackRiders: [
		{
			timing: "onHit",
			effects: [{ type: "damage", target: "enemy", damageType: "crushing", dice: "1d6" }],
		},
	],
});
