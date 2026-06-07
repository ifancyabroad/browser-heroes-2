import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "binkus_the_all_knowing",
	name: "Binkus the All Knowing",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC8tx6bQo9WPm4r_qrW?alt=media&token=dd7d49ee-c291-4f2f-a4b0-ea21397b3b1c",
	rank: "boss",
	level: 25,
	threat: 25,
	attributes: {
		strength: 8,
		dexterity: 14,
		constitution: 16,
		intelligence: 24,
		wisdom: 18,
		charisma: 16,
	},
	combat: {
		maxHp: 385,
		armourClass: 21,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"fire",
				"lightning",
				"piercing",
				"poison",
				"slashing",
			],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackBonus: 7,
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: [
			"finger_of_death",
			"globe_of_invulnerability",
			"chain_lightning",
			"dragon_breath",
			"pierce_magic",
			"binkus_deathray",
		],
		featIds: [],
		tactic: "caster",
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
