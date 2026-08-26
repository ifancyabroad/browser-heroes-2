import { buildSystemGhost } from "../builders/buildSystemGhost";

export default buildSystemGhost({
	id: "venom_shade",
	encounterLevel: 5,
	heroLevel: 6,
	name: "Veyra",
	classId: "rogue",
	additionalSkillIds: ["backstab", "evasion"],
	featIds: ["deadly_precision", "duelist"],
	equipment: {
		body: { baseId: "base_studded_leather", rarity: "uncommon" },
		mainHand: { baseId: "base_dagger", rarity: "uncommon" },
	},
});
