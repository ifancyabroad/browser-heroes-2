import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ogmunsta_acolyte",
	name: "Og'munsta Acolyte",
	description:
		"An initiate chosen for an innate psychic gift, learning to shape the void's cold light. Those who endure their first communion hear the temple's deeper prayers.",
	portrait: "enemies/temple/ogmunsta_acolyte.png",
	rank: "normal",
	threat: 11,
	attributes: {
		strength: 10,
		dexterity: 12,
		constitution: 14,
		intelligence: 20,
		wisdom: 14,
		charisma: 14,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "ranged",
			name: "Void Flame",
			icon: "skills/warlock/shadow_bolt.png",
			attackAttribute: "intelligence",
			damage: {
				dice: "1d8",
				type: "cold",
				damageClass: "magical",
				attribute: "intelligence",
			},
		},
		skillIds: ["mind_lance", "spook"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence"],
	},
	encounter: {
		zone: "temple",
		weight: 1,
	},
	tags: [],
});
