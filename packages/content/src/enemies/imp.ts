import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "imp",
	name: "Imp",
	description:
		"A lesser fiend armed with a fork scavenged from Hell's arsenals. Its patrols drive escaped captives towards the roads watched by greater demons.",
	portrait: "enemies/hell/imp.png",
	rank: "normal",
	threat: 16,
	attributes: {
		strength: 8,
		dexterity: 17,
		constitution: 13,
		intelligence: 11,
		wisdom: 12,
		charisma: 14,
	},
	combat: {
		hitDie: "1d6",
		armourClass: 13,
		initiative: 10,
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
			attackRange: "melee",
			name: "Masterwork Trident",
			icon: "items/weapons/spears/Spear_03.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+4",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["impale"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "hell",
		weight: 1,
	},
	tags: [],
});
