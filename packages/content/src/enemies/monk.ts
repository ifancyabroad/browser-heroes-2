import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "monk",
	name: "Monk",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-LxGYypbHdVUhSGrE?alt=media&token=2310ff06-75eb-4c03-b754-e6f6527a219b",
	rank: "normal",
	level: 10,
	threat: 10,
	attributes: {
		strength: 10,
		dexterity: 12,
		constitution: 14,
		intelligence: 10,
		wisdom: 16,
		charisma: 10,
	},
	combat: {
		hitDice: "10d8+35",
		armourClass: 10,
		proficiencyBonus: 4,
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
				skillId: "cure_minor_wounds",
				rank: 1,
			},
			{
				skillId: "holy_bolt",
				rank: 1,
			},
		],
		featIds: ["runic_ward"],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["wisdom", "constitution"],
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
