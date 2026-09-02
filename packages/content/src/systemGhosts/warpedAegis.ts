import { buildSystemGhost } from "../builders/buildSystemGhost";

export default buildSystemGhost({
	id: "warped_aegis",
	encounterLevel: 8,
	heroLevel: 9,
	name: "Toren",
	classId: "battlemage",
	additionalSkillIds: ["iron_skin", "burning_rampage", "corruption", "finger_of_death"],
	featIds: ["spellbreaker", "flameborn"],
	equipment: {
		head: { baseId: "base_mask", rarity: "rare" },
		neck: { baseId: "base_chain", rarity: "rare" },
		body: { baseId: "base_chain_mail", rarity: "epic" },
		hands: { baseId: "base_gauntlets", rarity: "rare" },
		finger1: { baseId: "base_ring", rarity: "rare" },
		finger2: { baseId: "base_band", rarity: "rare" },
		waist: { baseId: "base_girdle", rarity: "epic" },
		feet: { baseId: "base_greaves", rarity: "rare" },
		mainHand: { baseId: "base_fire_staff", rarity: "epic" },
	},
});
