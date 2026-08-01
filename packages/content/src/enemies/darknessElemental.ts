import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "darkness_elemental",
	name: "Darkness Elemental",
	portrait: "enemies/tower/darkness_elemental.png",
	rank: "normal",
	threat: 18,
	attributes: {
		strength: 16,
		dexterity: 22,
		constitution: 18,
		intelligence: 8,
		wisdom: 12,
		charisma: 6,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 17,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"fire",
				"lightning",
				"necrotic",
				"piercing",
				"slashing",
			],
			immunities: ["poison"],
			vulnerabilities: ["radiant"],
		},
		basicAttack: {
			name: "Withering Touch",
			attackAttribute: "dexterity",
			damage: {
				dice: "2d4+2",
				type: "necrotic",
				attribute: "dexterity",
			},
		},
		skillIds: ["nightmares", "creeping_darkness"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});
