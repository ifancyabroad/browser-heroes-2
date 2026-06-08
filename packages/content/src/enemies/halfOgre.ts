import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "half_ogre",
	name: "Half Ogre",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-j9uq1e7GXuE-jJOV?alt=media&token=f449bfa4-ef90-4f5e-a2e0-5f683a4f6ef9",
	rank: "normal",
	level: 13,
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
		hitDice: "13d8+55",
		armourClass: 13,
		proficiencyBonus: 5,
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
		skills: [
			{
				skillId: "battle_cry",
				rank: 2,
			},
			{
				skillId: "heavy_strike",
				rank: 2,
			},
			{
				skillId: "skull_bash",
				rank: 2,
			},
		],
		featIds: [],
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
