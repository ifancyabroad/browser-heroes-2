import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_tracker",
	name: "Orc Tracker",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-hCT0lQo-TZeq1pL2?alt=media&token=3000f79b-487e-473b-90a0-9cf3606dd08d",
	rank: "normal",
	threat: 14,
	attributes: {
		strength: 14,
		dexterity: 18,
		constitution: 16,
		intelligence: 10,
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
				skillId: "multi_shot",
				rank: 2,
			},
			{
				skillId: "take_aim",
				rank: 2,
			},
			{
				skillId: "trip_wire",
				rank: 2,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});
