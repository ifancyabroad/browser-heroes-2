import { buildSystemGhost } from "../builders/buildSystemGhost";

export default buildSystemGhost({
	id: "dawn_keeper",
	encounterLevel: 4,
	name: "Elowen",
	classId: "priest",
	additionalSkillIds: ["cure_minor_wounds"],
	featIds: ["gifted_healer"],
	equipment: {
		body: { baseId: "base_robe", rarity: "uncommon" },
		mainHand: { baseId: "base_radiant_wand", rarity: "uncommon" },
		offHand: { baseId: "base_buckler", rarity: "uncommon" },
	},
});
