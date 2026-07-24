import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "runic_ward",
	name: "Runic Ward",
	description: "Protective runes remain etched into your defenses.",
	icon: "skills/feats/runic_ward.png",
	category: "defensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			value: 2,
		},
	],
	attackRiders: [],
	tags: ["occultist"],
});
