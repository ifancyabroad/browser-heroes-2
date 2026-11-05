import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ogmunsta_acolyte",
	name: "Og'munsta Acolyte",
	description:
		"An initiate chosen for an innate psychic gift, learning to shape the void's cold light. Those who endure their first communion hear the temple's deeper prayers.",
	portrait: "enemies/temple/ogmunsta_acolyte.png",
	rank: "normal",
	threat: 17,
	attributes: {
		strength: 10,
		dexterity: 12,
		constitution: 14,
		intelligence: 16,
		wisdom: 14,
		charisma: 14,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 15,
		initiative: 10,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Claws",
			icon: "skills/common/claw_strike.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6",
				type: "slashing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["mind_lance", "channel_the_void", "ice_blast"],
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
