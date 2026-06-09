import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "corrosive_craft",
	name: "Corrosive Craft",
	description: "Careful acid handling makes your corrosive damage harder to shrug off.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqdkxMP9wTCz81_T4e?alt=media&token=ff085bdf-6540-4975-9837-bbf5a6d3a5bc",
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
