import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ratman_shaman",
	name: "Ratman Shaman",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_V4rlMkRjOWIDQarx?alt=media&token=c97fd8ce-bd9c-4f2a-9778-aa3567bfb6d1",
	rank: "normal",
	threat: 11,
	attributes: {
		strength: 10,
		dexterity: 16,
		constitution: 14,
		intelligence: 14,
		wisdom: 14,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 12,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Claw",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d4",
				type: "slashing",
				attribute: "dexterity",
			},
		},
		skillIds: ["cure_medium_wounds", "bless", "lighting_bolt"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
