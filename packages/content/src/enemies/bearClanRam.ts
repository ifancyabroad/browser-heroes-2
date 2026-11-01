import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "bear_clan_ram",
	name: "Bear Clan Ram",
	description:
		"A covered siege engine built to break the gates of northern strongholds. Its shields bear the colours of households that supplied timber, iron and crew.",
	portrait: "enemies/tundra/bear_clan_ram.png",
	rank: "normal",
	threat: 22,
	attributes: {
		strength: 20,
		dexterity: 8,
		constitution: 20,
		intelligence: 10,
		wisdom: 10,
		charisma: 5,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 16,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Reinforced Ram",
			icon: "skills/unique/minotaur_charge.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d12+3",
				type: "crushing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["knock_down", "powerful_blow"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["constitution"],
	},
	encounter: {
		zone: "tundra",
		weight: 1,
	},
	tags: [],
});
