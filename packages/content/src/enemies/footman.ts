import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "footman",
	name: "Footman",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-RxyAdleyrS9bRXq_?alt=media&token=b43a5b79-274b-4db9-9a18-6379051fefc4",
	rank: "normal",
	threat: 11,
	attributes: {
		strength: 14,
		dexterity: 14,
		constitution: 14,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 10,
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
				rank: 1,
			},
			{
				skillId: "armour_break",
				rank: 1,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "dexterity"],
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
