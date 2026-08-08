import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "funereal",
	name: "Funereal",
	position: "prefix",
	rarity: "rare",
	weight: 0.75,
	appliesTo: [{ itemTypes: ["weapon"] }],
	attackRiders: [
		{
			timing: "onHit",
			effects: [{ type: "damage", target: "enemy", damageType: "necrotic", dice: "1d6" }],
		},
	],
});
