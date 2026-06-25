import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_royal_ballista",
	name: "The Royal Ballista",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-V5qou-xrOAQnh3Qm?alt=media&token=bbf8f1c8-9e5a-4df0-aa9f-71dba245b771",
	rank: "boss",
	threat: 15,
	attributes: {
		strength: 18,
		dexterity: 12,
		constitution: 16,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
	},
	combat: {
		hitDice: "15d12+137",
		armourClass: 15,
		proficiencyBonus: 5,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "2d4+2",
				type: "piercing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "multi_shot",
				rank: 3,
			},
			{
				skillId: "reposition",
				rank: 3,
			},
			{
				skillId: "burning_shot",
				rank: 3,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "dexterity"],
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
