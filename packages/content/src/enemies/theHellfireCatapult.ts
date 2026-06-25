import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_hellfire_catapult",
	name: "The Hellfire Catapult",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_bEIXK4OQRQ8b5pzp?alt=media&token=ea071f73-d09d-4c29-97ab-951f39a9a806",
	rank: "boss",
	threat: 17,
	attributes: {
		strength: 20,
		dexterity: 14,
		constitution: 18,
		intelligence: 10,
		wisdom: 10,
		charisma: 5,
	},
	combat: {
		hitDice: "17d12+171",
		armourClass: 16,
		proficiencyBonus: 6,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+6",
				type: "crushing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "disease_shot",
				rank: 3,
			},
			{
				skillId: "make_it_rain",
				rank: 3,
			},
			{
				skillId: "reposition",
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
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
