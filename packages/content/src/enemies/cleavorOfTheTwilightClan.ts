import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "cleavor_of_the_twilight_clan",
	name: "Cleavor of the Twilight Clan",
	description:
		"A horned champion who leads the Twilight Clan with a heavy battleaxe. Challenges to his authority are settled before the clan gathers for its evening rites.",
	portrait: "enemies/island/cleavor_of_the_twilight_clan.png",
	rank: "boss",
	threat: 19,
	attributes: {
		strength: 20,
		dexterity: 12,
		constitution: 18,
		intelligence: 10,
		wisdom: 12,
		charisma: 14,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 17,
		initiative: 12,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Superior Battleaxe",
			icon: "items/weapons/axes/Axe_11.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d10+2",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["twilight_trance", "charge", "powerful_blow"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "island",
		weight: 1,
	},
	tags: [],
});
