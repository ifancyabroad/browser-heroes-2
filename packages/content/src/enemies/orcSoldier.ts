import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_soldier",
	name: "Orc Soldier",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-lBa51MudTHTCLF5t?alt=media&token=85410942-b208-4a70-91d1-e00dd54e15cc",
	rank: "normal",
	threat: 13,
	attributes: {
		strength: 18,
		dexterity: 14,
		constitution: 16,
		intelligence: 7,
		wisdom: 11,
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
		skills: [
			{
				skillId: "heavy_strike",
				rank: 2,
			},
			{
				skillId: "rend",
				rank: 2,
			},
			{
				skillId: "armour_break",
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
