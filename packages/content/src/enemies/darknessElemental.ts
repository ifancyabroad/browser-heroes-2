import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "darkness_elemental",
	name: "Darkness Elemental",
	portrait: "enemies/tower/darkness_elemental.png",
	rank: "normal",
	threat: 26,
	attributes: {
		strength: 16,
		dexterity: 22,
		constitution: 18,
		intelligence: 8,
		wisdom: 12,
		charisma: 6,
	},
	combat: {
		hitDie: "1d10",
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
			attackRange: "melee",
			name: "Withering Touch",
			attackAttribute: "dexterity",
			damage: {
				dice: "2d6",
				type: "necrotic",
				damageClass: "magical",
				attribute: "dexterity",
			},
		},
		skillIds: ["nightmares", "creeping_darkness"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["dexterity", "charisma"],
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});
