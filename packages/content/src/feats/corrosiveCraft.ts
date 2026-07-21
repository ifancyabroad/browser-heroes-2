import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "corrosive_craft",
	name: "Corrosive Craft",
	description: "Careful acid handling makes your corrosive damage harder to shrug off.",
	icon: "skills/feats/corrosive_craft.png",
	category: "elemental",
	modifiers: [
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			operation: "add",
			value: 1,
		},
		{
			type: "modifyDamage",
			damageType: "acid",
			operation: "add",
			value: 10,
		},
	],
	attackRiders: [],
	tags: ["rogue"],
});
