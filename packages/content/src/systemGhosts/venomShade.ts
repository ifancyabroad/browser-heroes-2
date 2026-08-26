import { buildSystemGhost } from "../builders/buildSystemGhost";

export default buildSystemGhost({
	id: "venom_shade",
	encounterLevel: 5,
	name: "Veyra",
	classId: "rogue",
	additionalSkillIds: ["backstab", "evasion"],
	featIds: ["deadly_precision"],
	equipment: {
		body: { baseId: "base_studded_leather", rarity: "uncommon" },
		mainHand: { baseId: "base_dagger", rarity: "uncommon" },
	},
});
