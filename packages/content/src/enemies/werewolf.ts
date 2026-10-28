import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "werewolf",
	name: "Werewolf",
	description:
		"A cursed highland hunter whose claws tear through flesh and whose hide turns ordinary blows. Isolated settlements bar their doors when its tracks appear beside the livestock pens.",
	portrait: "enemies/mountain/werewolf.png",
	rank: "normal",
	threat: 16,
	attributes: {
		strength: 18,
		dexterity: 16,
		constitution: 16,
		intelligence: 10,
		wisdom: 12,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 14,
		damageAffinities: {
			resistances: ["crushing", "piercing", "slashing"],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Claws",
			icon: "skills/common/claw_strike.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d4",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "rend"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["constitution"],
	},
	encounter: {
		zone: "mountain",
		weight: 1,
	},
	tags: [],
});
