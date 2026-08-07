import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "vampiric",
	name: "Vampiric",
	position: "prefix",
	rarity: "rare",
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["dagger", "shortsword", "longsword", "wand"],
		},
	],
	attackRiders: [
		{
			timing: "onCrit",
			effects: [
				{
					type: "heal",
					target: "self",
					dice: "1d6",
				},
			],
		},
	],
});
