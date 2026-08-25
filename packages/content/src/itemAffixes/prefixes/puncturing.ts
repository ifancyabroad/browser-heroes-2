import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "puncturing",
	name: "Puncturing",
	position: "prefix",
	rarity: "uncommon",
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["bow", "crossbow", "dagger", "shortsword", "morningstar", "spear"],
			damageTypes: ["piercing"],
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					damageClass: "physical",
					dice: "1d4",
				},
			],
		},
	],
});
