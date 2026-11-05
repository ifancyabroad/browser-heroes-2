import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "death_knight",
	name: "Death Knight",
	shortName: "Knight",
	description:
		"An oath-bound rider mounted on a beast raised from the citadel's charnel pits. Its patrol continues beyond the walls along roads buried by later generations.",
	portrait: "enemies/citadel/death_knight.png",
	rank: "normal",
	threat: 24,
	attributes: {
		strength: 22,
		dexterity: 14,
		constitution: 20,
		intelligence: 10,
		wisdom: 16,
		charisma: 18,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 20,
		initiative: 13,
		damageAffinities: {
			resistances: ["acid", "cold", "fire", "lightning", "necrotic", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: ["crushing"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Exceptional Lance",
			icon: "items/weapons/spears/Spear_v2_10.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+3",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["impale", "unholy_strike", "overpower"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "charisma"],
	},
	encounter: {
		zone: "citadel",
		weight: 1,
	},
	tags: [],
});
