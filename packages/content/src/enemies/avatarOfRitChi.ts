import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "avatar_of_rit_chi",
	name: "Avatar of Rit Chi",
	portrait: "enemies/desert/avatar_of_rit_chi.png",
	rank: "boss",
	threat: 18,
	attributes: {
		strength: 19,
		dexterity: 16,
		constitution: 20,
		intelligence: 4,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 15,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["crushing"],
		},
		basicAttack: {
			name: "Claw",
			attackAttribute: "strength",
			damage: {
				dice: "2d4+4",
				type: "slashing",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "call_upon_rit_chi"],
		featIds: ["siphoned_vigor"],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["constitution", "strength", "dexterity"],
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
