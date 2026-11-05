import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "skeleton_watchman",
	name: "Skeleton Watchman",
	shortName: "Watchman",
	description:
		"A skeletal sentry whose lantern burns with a stolen soul. Its patrol follows a route laid down before the citadel's last living garrison vanished.",
	portrait: "enemies/citadel/skeleton_watchman.png",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 10,
		dexterity: 14,
		constitution: 14,
		intelligence: 6,
		wisdom: 10,
		charisma: 5,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
		initiative: 10,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["crushing"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Exceptional Mining Pick",
			icon: "items/weapons/hammers/Hammer_21.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d6+3",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["marked_for_death"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "citadel",
		weight: 1,
	},
	tags: [],
});
