import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "fire_drake",
	name: "Fire Drake",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NhkeXYbGnQ67kC7gWyw?alt=media&token=e1a3bff8-36b5-4df4-abef-870060c3b0aa",
	rank: "normal",
	threat: 17,
	attributes: {
		strength: 21,
		dexterity: 13,
		constitution: 18,
		intelligence: 14,
		wisdom: 11,
		charisma: 19,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 15,
		damageAffinities: {
			resistances: ["fire", "lightning"],
			immunities: [],
			vulnerabilities: ["cold"],
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
		skillIds: ["fire_breath", "drop_from_above"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "charisma"],
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
