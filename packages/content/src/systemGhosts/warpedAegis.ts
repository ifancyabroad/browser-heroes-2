import { buildSystemGhost } from "../builders/buildSystemGhost";

export default buildSystemGhost({
	id: "warped_aegis",
	encounterLevel: 8,
	heroLevel: 9,
	name: "Toren",
	classId: "battlemage",
	additionalSkillIds: ["fireball", "iron_skin", "burning_rampage", "corruption"],
	featIds: ["spellbreaker", "flameborn"],
	equipment: {
		body: { baseId: "base_chain_mail", rarity: "epic" },
		mainHand: { baseId: "base_quarterstaff", rarity: "epic" },
	},
});
