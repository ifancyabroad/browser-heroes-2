import { buildSystemGhost } from "../builders/buildSystemGhost";

export default buildSystemGhost({
	id: "dawn_keeper",
	encounterLevel: 4,
	heroLevel: 5,
	name: "Elowen",
	classId: "priest",
	additionalSkillIds: ["cure_minor_wounds", "divine_protection"],
	featIds: ["gifted_healer"],
	equipment: {
		body: { baseId: "base_robe", rarity: "uncommon" },
		mainHand: { baseId: "base_radiant_wand", rarity: "uncommon" },
		offHand: { baseId: "base_buckler", rarity: "uncommon" },
	},
});
