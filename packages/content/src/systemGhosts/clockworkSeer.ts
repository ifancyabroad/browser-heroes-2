import { buildSystemGhost } from "../builders/buildSystemGhost";

export default buildSystemGhost({
	id: "clockwork_seer",
	encounterLevel: 9,
	heroLevel: 10,
	name: "Mira",
	classId: "artificer",
	additionalSkillIds: ["acid_bomb", "armour", "evasion", "lightning_bolt"],
	featIds: ["jack_of_all_trades", "corrosive_blood", "potent_casting"],
	equipment: {
		body: { baseId: "base_studded_leather", rarity: "epic" },
		mainHand: { baseId: "base_crossbow", rarity: "epic" },
	},
});
