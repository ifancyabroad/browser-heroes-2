import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "grotesque",
	name: "Grotesque",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NKt-VrmU-I7ve15fvwC?alt=media&token=a6fea0d8-4d7a-4b4d-88e9-e61124c5bbf4",
	rank: "normal",
	threat: 14,
	attributes: {
		strength: 18,
		dexterity: 10,
		constitution: 16,
		intelligence: 2,
		wisdom: 6,
		charisma: 3,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 14,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["radiant"],
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
		skillIds: ["into_the_grinder", "leap_attack"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});
