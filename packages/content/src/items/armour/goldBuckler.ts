import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gold_buckler",
	name: "Gold Buckler",
	description:
		"A small but sturdy buckler plated with gleaming gold, offering both defense and prestige.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEdBv-UWjlNRRjd8Gv?alt=media&token=748f3207-a3c5-4f77-9cc9-884376588f59",
	level: 3,
	price: 650,
	armourType: "misc",
	properties: [
		{
			name: "armourClass",
			type: "auxiliaryStat",
			value: 1,
		},
		{
			name: "cold",
			type: "resistance",
			value: 20,
		},
		{
			name: "fire",
			type: "resistance",
			value: 20,
		},
		{
			name: "lightning",
			type: "resistance",
			value: 20,
		},
	],
	type: "shield",
});
