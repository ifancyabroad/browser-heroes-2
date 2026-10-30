import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "mana_bug",
	name: "Mana Bug",
	description:
		"An island beetle that stores stray magic beneath a translucent shell. It gathers around old enchantments, leaving abandoned wards dangerously depleted.",
	portrait: "enemies/island/mana_bug.png",
	rank: "normal",
	threat: 13,
	attributes: {
		strength: 6,
		dexterity: 16,
		constitution: 12,
		intelligence: 2,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 15,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Mandibles",
			icon: "skills/common/bite.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d4",
				type: "piercing",
				damageClass: "physical",
				attribute: "dexterity",
			},
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "damage",
							target: "enemy",
							damageType: "lightning",
							damageClass: "magical",
							dice: "1d4",
						},
					],
				},
			],
		},
		skillIds: ["mana_burst"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "island",
		weight: 1,
	},
	tags: [],
});
