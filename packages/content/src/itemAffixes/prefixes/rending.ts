import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "rending",
	name: "Rending",
	position: "prefix",
	rarity: "uncommon",
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["battleaxe", "greatsword"],
			damageTypes: ["slashing"],
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "slashing",
					dice: "1d4",
				},
			],
		},
	],
});
