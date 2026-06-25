import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "binkus_the_all_knowing",
	name: "Binkus the All Knowing",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC8tx6bQo9WPm4r_qrW?alt=media&token=dd7d49ee-c291-4f2f-a4b0-ea21397b3b1c",
	rank: "boss",
	threat: 25,
	attributes: {
		strength: 8,
		dexterity: 14,
		constitution: 16,
		intelligence: 24,
		wisdom: 18,
		charisma: 16,
	},
	combat: {
		hitDice: "1d12+9",
		armourClass: 21,
		proficiencyBonus: 8,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"fire",
				"lightning",
				"piercing",
				"poison",
				"slashing",
			],
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
				skillId: "finger_of_death",
				rank: 3,
			},
			{
				skillId: "chain_lightning",
				rank: 3,
			},
			{
				skillId: "dragon_breath",
				rank: 3,
			},
			{
				skillId: "binkus_deathray",
				rank: 3,
			},
		],
		featIds: ["arcane_warding", "arcane_penetration"],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "wisdom", "constitution"],
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
