import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "grotesque",
	name: "Grotesque",
	portrait: "enemies/hills/grotesque.png",
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
		hitDie: "1d10",
		armourClass: 14,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["radiant"],
		},
		basicAttack: {
			name: "Greatsword",
			attackAttribute: "strength",
			damage: {
				dice: "2d6",
				type: "slashing",
				attribute: "strength",
			},
		},
		skillIds: ["into_the_grinder", "leap_attack"],
		featIds: [],
		tactic: "aggressive",
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
