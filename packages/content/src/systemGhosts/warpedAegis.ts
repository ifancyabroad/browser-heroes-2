import { buildSystemGhost } from "../builders/buildSystemGhost";

export default buildSystemGhost({
	id: "warped_aegis",
	encounterLevel: 8,
	name: "Toren",
	classId: "battlemage",
	additionalSkillIds: ["fireball", "iron_skin", "burning_rampage"],
	featIds: ["spellbreaker", "flameborn"],
	equipment: {
		body: { baseId: "base_chain_mail", rarity: "epic" },
		mainHand: { baseId: "base_quarterstaff", rarity: "epic" },
	},
});
