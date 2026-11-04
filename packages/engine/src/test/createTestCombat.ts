import type { CombatantSide, CombatantState, CombatState } from "../schemas";

// Behaviour tests start from explicit values, independent of authored content and run generation.
export function createTestCombat(): CombatState {
	return {
		id: "test-combat",
		encounterType: "standard",
		ghostUsername: null,
		ghostSource: null,
		turnNumber: 1,
		activeActor: "player",
		player: createCombatant("player"),
		enemy: createCombatant("enemy"),
		log: [],
		status: "active",
	};
}

function createCombatant(side: CombatantSide): CombatantState {
	return {
		id: `test-combat:${side}`,
		side,
		sourceId: `test-${side}`,
		name: `Test ${side}`,
		portrait: "test.png",
		level: 1,
		maxHp: 100,
		currentHp: 100,
		attributes: {
			strength: 10,
			dexterity: 10,
			constitution: 10,
			intelligence: 10,
			wisdom: 10,
			charisma: 10,
		},
		combatStats: {
			armourClass: 10,
			initiative: 10,
			attackRollBonus: 0,
			savingThrowBonus: 0,
			saveDcBonus: 0,
			criticalRangeBonus: 0,
			criticalDiceMultiplierBonus: 0,
			healingMultiplier: 1,
			maxHpBonus: 0,
			damageAffinities: { immunities: [], resistances: [], vulnerabilities: [] },
			damageModifiers: [],
			damageTakenModifiers: [],
		},
		savingThrowProficiencies: [],
		basicAttack: {
			name: "Test attack",
			icon: "test.png",
			attackRange: "melee",
			attackAttribute: "strength",
			proficient: true,
			damage: {
				dice: "1d4",
				type: "crushing",
				damageClass: "physical",
				attribute: "strength",
			},
			attackRiders: [],
		},
		offHandBasicAttack: null,
		skills: [],
		featIds: [],
		activeEffects: [],
		tactic: "default",
	};
}
