import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "dracolich",
	name: "Dracolich",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9OF2HqGp-rpiUO0C6?alt=media&token=9049c523-27b1-440e-9787-d1b62f46a859",
	rank: "normal",
	threat: 20,
	attributes: {
		strength: 22,
		dexterity: 14,
		constitution: 18,
		intelligence: 16,
		wisdom: 14,
		charisma: 20,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 18,
		damageAffinities: {
			resistances: ["acid", "cold", "fire", "lightning", "necrotic", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: ["crushing", "radiant"],
		},
		basicAttack: {
			name: "Claw",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+6",
				type: "slashing",
				attribute: "strength",
			},
		},
		skillIds: ["tail_swipe", "double_strike", "necro_breath", "dragon_focus"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "charisma"],
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
