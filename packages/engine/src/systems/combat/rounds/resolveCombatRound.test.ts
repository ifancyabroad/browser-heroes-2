import { selectAvailableActions } from "../../../selectors/selectAvailableActions";
import type { RiderEffect } from "@app/content";
import { describe, expect, it } from "vitest";
import { applyAction } from "../../../actions";
import type { CombatantSide, EngineAction, RunState } from "../../../schemas";
import { createTestCombat, createTestStatus } from "../../../test/createTestCombat";
import { hasActiveStatus } from "../effects/statuses/hasActiveStatus";
import {
	createTestCombatState,
	addPlayerStatus,
	modifyTestRunState,
} from "../../../test/createTestRunState";
import { resolveSkillEffects } from "../skills/resolveSkillEffects";

function createRoundState(enemyInitiative = 11) {
	const state = createTestCombatState();
	const sourceId = state.combat!.enemy.sourceId;
	state.combat = createTestCombat();
	state.combat.enemy.sourceId = sourceId;
	state.combat.enemy.combatStats.initiative = enemyInitiative;
	state.combat.player.skills = [{ skillId: "armour", chargesRemaining: 2 }];
	for (const side of ["player", "enemy"] as const) {
		const actor = state.combat[side];
		actor.basicAttack.damage = { dice: "1d4", type: "crushing", damageClass: "physical" };
		actor.activeEffects = [
			{
				id: `${side}-hit`,
				type: "modifyRoll",
				sourceCombatantId: actor.id,
				sourceSide: side,
				source: {
					type: "skill",
					skillId: "focus_energy",
					sourceName: "Test",
					sourceEffectKey: "hit",
				},
				duration: { unit: "battles", remaining: 1 },
				roll: "attack",
				mode: "automaticSuccess",
			},
		];
	}
	return state;
}

function addRider(state: RunState, side: CombatantSide, ...effects: RiderEffect[]) {
	state.combat![side].basicAttack.attackRiders.push({ timing: "onHit", effects });
}

function attackOrder(state: RunState, turnNumber = 1) {
	return state
		.combat!.log.filter(
			(entry) => entry.turnNumber === turnNumber && entry.eventType === "basic_attack",
		)
		.map((entry) => entry.actor);
}

const attack = { type: "PLAYER_BASIC_ATTACK" } as const;
const skill = { type: "PLAYER_USE_SKILL", skillId: "armour" } as const;
const potion = { type: "PLAYER_USE_CONSUMABLE", consumableType: "healingPotion" } as const;

const explosivePotion = {
	type: "PLAYER_USE_CONSUMABLE",
	consumableType: "explosivePotion",
} as const;
const speedPotion = { type: "PLAYER_USE_CONSUMABLE", consumableType: "speedPotion" } as const;
function createConsumableRoundState(
	consumableType: "speedPotion" | "explosivePotion",
	enemyFirst = false,
) {
	const state = createRoundState(enemyFirst ? 10000 : 9);
	state.combat!.player.activeEffects = [];
	state.hero.consumables[consumableType] = 2;
	return { ...state, combat: state.combat!, rngState: { value: 0 } };
}

describe("resolveCombatRound", () => {
	it.each([
		[9, ["player", "enemy"]],
		[10, ["player", "enemy"]],
		[11, ["enemy", "player"]],
	])("orders Initiative 10 against %i", (initiative, expected) => {
		const result = applyAction(createRoundState(initiative), attack);

		expect(result.ok).toBe(true);
		expect(attackOrder(result.state)).toEqual(expected);
		expect(result.state.combat).toMatchObject({ activeActor: "player", turnNumber: 2 });
		expect(result.events.filter((event) => event.type === "COMBAT_TURN_RESOLVED")).toHaveLength(
			1,
		);
	});

	it.each([5, -5])("uses temporary Initiative changes (%i) starting next round", (value) => {
		const state = createRoundState(value > 0 ? 11 : 9);
		const side = value > 0 ? "enemy" : "player";
		addRider(state, side, {
			type: "modifyStat",
			target: value > 0 ? "enemy" : "self",
			stat: "initiative",
			value,
			duration: { unit: "turns", value: 2 },
		});

		const first = applyAction(state, attack);

		const second = applyAction(first.state, attack);

		expect(attackOrder(first.state)).toEqual(
			value > 0 ? ["enemy", "player"] : ["player", "enemy"],
		);
		expect(attackOrder(second.state, 2)).toEqual(
			value > 0 ? ["player", "enemy"] : ["enemy", "player"],
		);
	});

	it("supports Initiative skill effects and keeps the current order when the buff expires", () => {
		const state = createRoundState();

		const buff = resolveSkillEffects({
			combat: state.combat!,
			actorSide: "player",
			skillId: "armour",
			skillName: "Test Initiative",
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "initiative",
					value: 5,
					duration: { unit: "turns", value: 1 },
				},
			],
			rngState: state.rngState,
		});
		state.combat = buff.value;
		state.rngState = buff.rngState;

		const first = applyAction(state, attack);

		expect(attackOrder(first.state)).toEqual(["player", "enemy"]);
		expect(
			first.state.combat!.player.activeEffects.some((effect) => effect.type === "modifyStat"),
		).toBe(false);

		const second = applyAction(first.state, attack);

		expect(attackOrder(second.state, 2)).toEqual(["enemy", "player"]);
	});

	it.each([attack, skill, potion, explosivePotion, speedPotion])(
		"cancels $type when the faster enemy stuns the hero",
		(action) => {
			const state = createRoundState();
			if (action.type === "PLAYER_USE_CONSUMABLE") {
				state.hero.consumables[action.consumableType] = 2;
			}
			addRider(state, "enemy", {
				type: "applyStatus",
				target: "enemy",
				statusId: "stunned",
				duration: { unit: "turns", value: 1 },
			});

			const result = applyAction(state, action);

			expect(result.ok).toBe(true);
			expect(result.state.combat!.status).toBe("active");
			expect(attackOrder(result.state)).toEqual(["enemy"]);
			expect(result.state.hero.consumables).toEqual(state.hero.consumables);
			expect(
				result.state.combat!.log.some((entry) => entry.eventType === "consumable_used"),
			).toBe(false);
			expect(
				result.state.combat!.player.activeEffects.some(
					(effect) => effect.type === "status" && effect.statusId === "haste",
				),
			).toBe(false);
			expect(result.state.combat!.player.skills).toEqual(state.combat!.player.skills);
			expect(result.events.map((event) => event.type)).toEqual(["COMBAT_TURN_RESOLVED"]);
			expect(result.state.combat!.log).toContainEqual(
				expect.objectContaining({
					actor: "player",
					eventType: "turn_skipped",
					message: "Test player is stunned and cannot act.",
				}),
			);
			expect(
				result.state.combat!.player.activeEffects.some(
					(effect) => effect.type === "status",
				),
			).toBe(false);
		},
	);

	it("falls back to a basic attack when the faster enemy silences a selected skill", () => {
		const state = createRoundState();
		state.combat!.enemy.currentHp = 1;
		addRider(state, "enemy", {
			type: "applyStatus",
			target: "enemy",
			statusId: "silenced",
			duration: { unit: "turns", value: 1 },
		});

		const result = applyAction(state, skill);

		expect(attackOrder(result.state)).toEqual(["enemy", "player"]);
		expect(result.state.combat!.player.skills).toEqual(state.combat!.player.skills);
		expect(result.events.some((event) => event.type === "SKILL_USED")).toBe(false);
		expect(result.events).toContainEqual(
			expect.objectContaining({
				finishingPlayerAction: { type: "basic_attack", targetStartedAtFullHp: false },
			}),
		);
	});

	it("records target health immediately before the hero's finishing action", () => {
		const state = createRoundState();
		state.combat!.player.basicAttack.damage.dice = "1d4+100";
		addRider(state, "enemy", {
			type: "damage",
			target: "self",
			dice: "1d4",
			damageType: "necrotic",
			damageClass: "magical",
			requiresAttackRoll: false,
		});

		const result = applyAction(state, attack);

		expect(result.events).toContainEqual(
			expect.objectContaining({
				finishingPlayerAction: { type: "basic_attack", targetStartedAtFullHp: false },
			}),
		);
	});

	it("still skips a slower enemy stunned by the hero", () => {
		const state = createRoundState(9);
		addRider(state, "player", {
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			duration: { unit: "turns", value: 1 },
		});

		const result = applyAction(state, attack);

		expect(attackOrder(result.state)).toEqual(["player"]);
		expect(result.state.combat!.log).toContainEqual(
			expect.objectContaining({ actor: "enemy", eventType: "turn_skipped" }),
		);
		expect(
			result.state.combat!.enemy.activeEffects.some((effect) => effect.type === "status"),
		).toBe(false);
	});

	it("leaves an explicit skip unchanged when the enemy acts first", () => {
		const result = applyAction(createRoundState(), { type: "PLAYER_SKIP_TURN" });

		expect(attackOrder(result.state)).toEqual(["enemy"]);
		expect(result.state.combat!.log).toContainEqual(
			expect.objectContaining({
				actor: "player",
				eventType: "turn_skipped",
				message: "Test player skips their turn.",
			}),
		);
	});

	it("consumes a skill charge and emits one usage event only when the skill resolves", () => {
		const result = applyAction(createRoundState(), skill);

		expect(result.ok).toBe(true);
		expect(result.state.combat!.player.skills[0].chargesRemaining).toBe(1);
		expect(result.events.filter((event) => event.type === "SKILL_USED")).toHaveLength(1);

		const buff = result.state.combat!.player.activeEffects.find(
			(effect) => effect.type === "modifyStat",
		);

		expect(buff?.duration).toEqual({ unit: "battles", remaining: 5 });
	});

	it("heals from the post-enemy state and consumes one potion", () => {
		const result = applyAction(createRoundState(), potion);
		const player = result.state.combat!.player;
		const damageTaken = result.state.combat!.log.reduce((total, entry) => {
			const outcome = entry.outcome;
			return outcome?.type === "damage" && outcome.targetId === player.id
				? total + outcome.hpDamage
				: total;
		}, 0);

		expect(result.ok).toBe(true);
		expect(damageTaken).toBeGreaterThan(0);
		expect(player.currentHp).toBe(player.maxHp);
		expect(result.events).toContainEqual({
			type: "CONSUMABLE_USED",
			consumableType: "healingPotion",
			remainingQuantity: 2,
		});
		expect(
			result.state.combat!.log.find(
				(entry) => entry.eventType === "healing_done" && entry.actor === "player",
			)?.outcome,
		).toEqual({ type: "healing", targetId: player.id, amount: damageTaken });
	});

	it.each([attack, skill, potion, explosivePotion, speedPotion])(
		"ends in defeat without executing $type after lethal enemy damage",
		(action) => {
			const state = createRoundState();
			if (action.type === "PLAYER_USE_CONSUMABLE") {
				state.hero.consumables[action.consumableType] = 2;
			}
			state.combat!.player.currentHp = 1;

			const result = applyAction(state, action);

			expect(result.state.phase).toBe("dead");
			expect(result.ok).toBe(true);
			expect(result.state.combat!.status).toBe("enemy_won");
			expect(attackOrder(result.state)).toEqual(["enemy"]);
			expect(result.state.hero.consumables).toEqual(state.hero.consumables);
			expect(
				result.state.combat!.log.some((entry) => entry.eventType === "consumable_used"),
			).toBe(false);
			expect(
				result.state.combat!.player.activeEffects.some(
					(effect) => effect.type === "status" && effect.statusId === "haste",
				),
			).toBe(false);
			expect(result.state.combat!.player.skills).toEqual(state.combat!.player.skills);
			expect(result.events).toEqual([
				expect.objectContaining({ type: "COMBAT_ENDED", outcome: "defeat" }),
			]);
		},
	);

	it.each([9, 11])("awards victory once with enemy Initiative %i", (initiative) => {
		const state = createRoundState(initiative);
		state.combat!.enemy.currentHp = 1;

		const result = applyAction(state, attack);

		expect(result.ok).toBe(true);
		expect(result.state.kills).toBe(state.kills + 1);
		expect(result.events.filter((event) => event.type === "COMBAT_ENDED")).toEqual([
			expect.objectContaining({
				outcome: "victory",
				finishingPlayerAction: { type: "basic_attack", targetStartedAtFullHp: false },
			}),
		]);
		expect(attackOrder(result.state)).toEqual(
			initiative > 10 ? ["enemy", "player"] : ["player"],
		);
	});

	it.each(["player", "enemy"] as const)(
		"checks lethal recurring damage after the faster %s acts",
		(side) => {
			const state = createRoundState(side === "player" ? 9 : 11);
			const actor = state.combat![side];
			actor.currentHp = 1;
			actor.activeEffects.push({
				id: "dot",
				type: "damageOverTime",
				damageType: "necrotic",
				damageClass: "magical",
				dice: "1d4",
				duration: { unit: "turns", remaining: 1 },
				sourceCombatantId: actor.id,
				sourceSide: side,
				source: {
					type: "skill",
					skillId: "armour",
					sourceName: "Test",
					sourceEffectKey: "dot",
				},
			});

			const result = applyAction(state, attack);

			expect(attackOrder(result.state)).toEqual([side]);
			expect(result.state.combat!.status).toBe(
				side === "player" ? "enemy_won" : "player_won",
			);
			expect(result.events.filter((event) => event.type === "COMBAT_ENDED")).toHaveLength(1);

			if (side === "enemy") {
				expect(result.events).toContainEqual(
					expect.objectContaining({ finishingPlayerAction: null }),
				);
			}
		},
	);

	it("does not advance a newly applied self effect on the action that applies it", () => {
		const state = createRoundState();
		state.combat!.enemy.currentHp = 50;
		addRider(state, "enemy", {
			type: "healOverTime",
			target: "self",
			dice: "1d4",
			duration: { unit: "turns", value: 2 },
		});

		const result = applyAction(state, attack);

		const effect = result.state.combat!.enemy.activeEffects.find(
			(effect) => effect.type === "healOverTime",
		);

		expect(effect?.duration).toEqual({ unit: "turns", remaining: 2 });
		expect(
			result.state.combat!.log.some(
				(entry) =>
					entry.eventType === "effect_triggered" &&
					entry.outcome?.type === "healing" &&
					entry.outcome.targetId === result.state.combat!.enemy.id,
			),
		).toBe(false);
	});

	it("rejects invalid submissions before the enemy acts and preserves deterministic inputs", () => {
		const state = createRoundState();
		const original = structuredClone(state);
		const invalid: EngineAction = { type: "PLAYER_USE_SKILL", skillId: "heavy_strike" };

		const result = applyAction(state, invalid);

		expect(result.ok).toBe(false);
		expect(result.state).toEqual(original);

		const first = applyAction(state, attack);
		const second = applyAction(state, attack);

		expect(first.ok).toBe(true);
		expect(second.ok).toBe(true);
		expect(first).toEqual(second);
		expect(state).toEqual(original);
	});

	it("rejects use with no potions or while stunned", () => {
		const empty = modifyTestRunState(createTestCombatState(), (draft) => {
			draft.hero.consumables.healingPotion = 0;
		});
		expect(
			applyAction(empty, {
				type: "PLAYER_USE_CONSUMABLE",
				consumableType: "healingPotion",
			}),
		).toMatchObject({ ok: false, error: "NO_CONSUMABLES_AVAILABLE" });

		const stunned = addPlayerStatus(createTestCombatState(), "stunned");
		expect(
			applyAction(stunned, {
				type: "PLAYER_USE_CONSUMABLE",
				consumableType: "healingPotion",
			}),
		).toMatchObject({ ok: false, error: "PLAYER_CANNOT_ACT" });
	});

	it("ends combat with normal rewards before the enemy acts on a killing throw", () => {
		const state = createConsumableRoundState("explosivePotion");
		state.combat.enemy.currentHp = 1;
		const result = applyAction(state, explosivePotion);
		expect(result.ok).toBe(true);
		expect(result.state.combat!.status).toBe("player_won");
		expect(result.state.kills).toBe(state.kills + 1);
		expect(result.state.gold).toBeGreaterThan(state.gold);
		expect(result.events.filter((event) => event.type === "COMBAT_ENDED")).toHaveLength(1);
		expect(
			result.state.combat!.log.some(
				(entry) => entry.actor === "enemy" && entry.eventType === "basic_attack",
			),
		).toBe(false);
	});

	it("rejects use with an empty inventory without advancing RNG", () => {
		const state = createConsumableRoundState("explosivePotion");
		state.hero.consumables.explosivePotion = 0;
		expect(selectAvailableActions(state)).not.toContainEqual(explosivePotion);
		expect(applyAction(state, explosivePotion)).toMatchObject({
			ok: false,
			error: "NO_CONSUMABLES_AVAILABLE",
			state,
		});
	});

	it("preserves the drinking round's order and guarantees first action in later rounds", () => {
		const state = createConsumableRoundState("speedPotion", true);
		expect(selectAvailableActions(state)).toContainEqual(speedPotion);
		const first = applyAction(state, speedPotion);
		expect(first.ok).toBe(true);
		expect(
			first.state
				.combat!.log.filter(
					(entry) =>
						entry.eventType === "consumable_used" || entry.eventType === "basic_attack",
				)
				.map((entry) => entry.actor),
		).toEqual(["enemy", "player"]);
		expect(first.state.hero.consumables).toEqual({
			healingPotion: 3,
			explosivePotion: 0,
			speedPotion: 1,
			invisibilityPotion: 0,
		});
		expect(first.events).toContainEqual({
			type: "CONSUMABLE_USED",
			consumableType: "speedPotion",
			remainingQuantity: 1,
		});
		expect(first.events).toContainEqual({ type: "COMBAT_TURN_RESOLVED" });
		expect(first.state.combat!.player.activeEffects).toEqual([
			expect.objectContaining({
				type: "status",
				statusId: "haste",
				duration: { unit: "battles", remaining: 1 },
				source: {
					type: "consumable",
					consumableId: "speedPotion",
					sourceName: "Potion of Speed",
					sourceEffectKey: "effect:0",
				},
			}),
		]);
		expect(first.state.combat!.log).toContainEqual(
			expect.objectContaining({
				eventType: "effect_applied",
				message: "Test player is hastened for 1 battle.",
			}),
		);

		const second = applyAction(first.state, { type: "PLAYER_SKIP_TURN" });
		expect(second.ok).toBe(true);
		expect(
			second.state
				.combat!.log.filter(
					(entry) =>
						entry.turnNumber === 2 &&
						(entry.eventType === "turn_skipped" || entry.eventType === "basic_attack"),
				)
				.map((entry) => entry.actor),
		).toEqual(["player", "enemy"]);
		expect(second.state.combat!.player.activeEffects).toEqual(
			first.state.combat!.player.activeEffects,
		);
	});

	it("allows drinking while silenced, but rejects empty inventory and a stunned drinker", () => {
		const state = createConsumableRoundState("speedPotion", true);
		expect(applyAction(addPlayerStatus(state, "silenced"), speedPotion).ok).toBe(true);
		expect(applyAction(addPlayerStatus(state, "stunned"), speedPotion)).toMatchObject({
			ok: false,
			error: "PLAYER_CANNOT_ACT",
		});
		state.hero.consumables.speedPotion = 0;
		expect(selectAvailableActions(state)).not.toContainEqual(speedPotion);
		expect(applyAction(state, speedPotion)).toMatchObject({
			ok: false,
			error: "NO_CONSUMABLES_AVAILABLE",
			state,
		});
	});

	it("preserves priority through a stunned skip without allowing the hero to act", () => {
		const first = applyAction(createConsumableRoundState("speedPotion", true), speedPotion);
		const stunned = addPlayerStatus(first.state, "stunned");
		const result = applyAction(stunned, { type: "PLAYER_SKIP_TURN" });
		expect(result.ok).toBe(true);
		expect(
			result.state
				.combat!.log.filter(
					(entry) =>
						entry.turnNumber === 2 &&
						(entry.eventType === "turn_skipped" || entry.eventType === "basic_attack"),
				)
				.map((entry) => [entry.actor, entry.eventType]),
		).toEqual([
			["player", "turn_skipped"],
			["enemy", "basic_attack"],
		]);
		expect(result.state.combat!.player.activeEffects).toEqual(
			first.state.combat!.player.activeEffects,
		);
	});
});

describe("resolveCombatRound invisibility", () => {
	function invisibleState(remaining = 3) {
		const state = createRoundState(9);
		state.combat!.player.activeEffects.push(
			createTestStatus(state.combat!.player, "invisible", remaining),
		);
		return state;
	}

	it.each([9, 11])(
		"takes effect when the potion executes against enemy Initiative %i",
		(initiative) => {
			const state = createRoundState(initiative);
			state.hero.consumables.invisibilityPotion = 1;
			const result = applyAction(state, {
				type: "PLAYER_USE_CONSUMABLE",
				consumableType: "invisibilityPotion",
			});
			expect(result.ok).toBe(true);
			expect(result.state.hero.consumables.invisibilityPotion).toBe(0);
			expect(hasActiveStatus(result.state.combat!.player, "invisible")).toBe(true);
			expect(attackOrder(result.state)).toEqual(initiative > 10 ? ["enemy"] : []);
		},
	);

	it("advances duration on skipped turns and allows targeting after expiration", () => {
		const first = applyAction(invisibleState(2), { type: "PLAYER_SKIP_TURN" });
		expect(hasActiveStatus(first.state.combat!.player, "invisible")).toBe(true);
		expect(attackOrder(first.state)).toEqual([]);
		const second = applyAction(first.state, { type: "PLAYER_SKIP_TURN" });
		expect(hasActiveStatus(second.state.combat!.player, "invisible")).toBe(false);
		// The enemy planned a skip before expiration and does not reconsider it.
		expect(attackOrder(second.state, 2)).toEqual([]);
		const third = applyAction(second.state, { type: "PLAYER_SKIP_TURN" });
		expect(attackOrder(third.state, 3)).toEqual(["enemy"]);
	});

	it.each([attack, skill, potion, explosivePotion, speedPotion])(
		"reveals the hero when $type executes",
		(action) => {
			const state = invisibleState();
			if (action.type === "PLAYER_USE_CONSUMABLE") {
				state.hero.consumables[action.consumableType] = 1;
			}
			const result = applyAction(state, action);
			expect(result.ok).toBe(true);
			expect(hasActiveStatus(result.state.combat!.player, "invisible")).toBe(false);
			expect(result.state.combat!.log).toContainEqual(
				expect.objectContaining({
					actor: "player",
					eventType: "effect_expired",
					message: "Invisibility ends on Test player.",
				}),
			);
			// A previously planned skip remains a skip even when the hero becomes visible.
			expect(attackOrder(result.state).filter((side) => side === "enemy")).toEqual([]);
		},
	);

	it("reveals an attacking hero even when the attack misses", () => {
		const state = invisibleState();
		const attackRoll = state.combat!.player.activeEffects.find(
			(effect) => effect.type === "modifyRoll",
		);
		if (!attackRoll || attackRoll.type !== "modifyRoll") {
			throw new Error("Expected the test attack roll modifier");
		}
		attackRoll.mode = "automaticFailure";
		const result = applyAction(state, attack);
		expect(result.ok).toBe(true);
		expect(result.state.combat!.enemy.currentHp).toBe(state.combat!.enemy.currentHp);
		expect(attackOrder(result.state)).toEqual(["player"]);
		expect(hasActiveStatus(result.state.combat!.player, "invisible")).toBe(false);
	});

	it("preserves invisibility when stun prevents an action", () => {
		const state = invisibleState();
		state.combat!.player.activeEffects.push(
			createTestStatus(state.combat!.player, "stunned", 1),
		);
		const result = applyAction(state, { type: "PLAYER_SKIP_TURN" });
		expect(result.ok).toBe(true);
		expect(hasActiveStatus(result.state.combat!.player, "invisible")).toBe(true);
	});

	it("continues existing damage over time without revealing the source", () => {
		const state = invisibleState();
		state.combat!.enemy.activeEffects.push({
			id: "existing-poison",
			type: "damageOverTime",
			dice: "1d4",
			damageType: "poison",
			damageClass: "other",
			sourceCombatantId: state.combat!.player.id,
			sourceSide: "player",
			source: {
				type: "skill",
				skillId: "armour",
				sourceName: "Test poison",
				sourceEffectKey: "poison",
			},
			duration: { unit: "turns", remaining: 2 },
		});
		const result = applyAction(state, { type: "PLAYER_SKIP_TURN" });
		expect(result.ok).toBe(true);
		expect(result.state.combat!.enemy.currentHp).toBeLessThan(state.combat!.enemy.currentHp);
		expect(hasActiveStatus(result.state.combat!.player, "invisible")).toBe(true);
	});
});
