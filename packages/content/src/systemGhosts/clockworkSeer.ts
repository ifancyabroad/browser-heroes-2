import { buildSystemGhost } from "../builders/buildSystemGhost";

export default buildSystemGhost({
	id: "clockwork_seer",
	encounterLevel: 9,
	heroLevel: 10,
	name: "Mira",
	classId: "artificer",
	additionalSkillIds: ["armour", "lightning_bolt", "acid_bomb", "chain_lightning"],
	featIds: ["jack_of_all_trades", "corrosive_blood", "potent_casting"],
	equipment: {
		head: { baseId: "base_circlet", rarity: "rare" },
		neck: { baseId: "base_amulet", rarity: "rare" },
		body: { baseId: "base_studded_leather", rarity: "epic" },
		hands: { baseId: "base_bracers", rarity: "epic" },
		finger1: { baseId: "base_ring", rarity: "rare" },
		finger2: { baseId: "base_band", rarity: "rare" },
		waist: { baseId: "base_belt", rarity: "epic" },
		feet: { baseId: "base_boots", rarity: "rare" },
		mainHand: { baseId: "base_crossbow", rarity: "epic" },
	},
});
