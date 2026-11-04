import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "deepborn_rider",
	name: "Deepborn Rider",
	description:
		"A Deepborn outrider mounted on a plated beast brought through the void. Temple handlers rear its offspring in chambers built around fragments of their native world.",
	portrait: "enemies/temple/deepborn_rider.png",
	rank: "normal",
	threat: 17,
	attributes: {
		strength: 20,
		dexterity: 12,
		constitution: 18,
		intelligence: 14,
		wisdom: 12,
		charisma: 10,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 16,
		initiative: 12,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Gore",
			icon: "skills/unique/minotaur_charge.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d6",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["charge", "leap_attack"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "temple",
		weight: 1,
	},
	tags: [],
});
