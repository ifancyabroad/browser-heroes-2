import type { StatusEffect } from "@app/content";

export const statusLabels: Record<StatusEffect, { name: string; adjective: string }> = {
	stunned: { name: "Stun", adjective: "stunned" },
	silenced: { name: "Silence", adjective: "silenced" },
	haste: { name: "Haste", adjective: "hastened" },
};
