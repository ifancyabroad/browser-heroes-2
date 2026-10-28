import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "void_horror",
	name: "Void Horror",
	description:
		"A small, ravenous aberration drawn through the temple's breaches between worlds. Its luminous lure guides prey towards a mouth the priesthood regards as an instrument of sacrifice.",
	portrait: "enemies/temple/void_horror.png",
	rank: "normal",
	threat: 16,
	attributes: {
		strength: 14,
		dexterity: 14,
		constitution: 14,
		intelligence: 8,
		wisdom: 14,
		charisma: 8,
	},
	combat: {
		hitDie: "1d6",
		armourClass: 13,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Bite",
			icon: "skills/common/bite.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["blind", "drain_life"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["constitution"],
	},
	encounter: {
		zone: "temple",
		weight: 1,
	},
	tags: [],
});
