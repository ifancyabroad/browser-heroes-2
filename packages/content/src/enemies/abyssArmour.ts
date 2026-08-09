import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "abyss_armour",
	name: "Abyss Armour",
	portrait: "enemies/abyss/abyss_armour.png",
	rank: "normal",
	threat: 23,
	attributes: {
		strength: 18,
		dexterity: 10,
		constitution: 18,
		intelligence: 10,
		wisdom: 12,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 20,
		damageAffinities: {
			resistances: ["acid", "cold", "crushing", "fire", "lightning", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Exceptional Shortsword",
			attackAttribute: "strength",
			damage: {
				dice: "1d6+3",
				type: "piercing",
				attribute: "strength",
			},
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "damage",
							target: "enemy",
							damageType: "lightning",
							dice: "1d10",
						},
					],
				},
			],
		},
		skillIds: ["armour_break", "disarm"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
