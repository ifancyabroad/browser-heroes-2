import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "half_ogre",
	name: "Half Ogre",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-j9uq1e7GXuE-jJOV?alt=media&token=f449bfa4-ef90-4f5e-a2e0-5f683a4f6ef9",
	rank: "normal",
	threat: 13,
	attributes: {
		strength: 19,
		dexterity: 12,
		constitution: 16,
		intelligence: 8,
		wisdom: 10,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["heavy_strike", "skull_bash"],
		featIds: ["brute_strength"],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});
