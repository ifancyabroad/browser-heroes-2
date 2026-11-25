import type { StatusEffect } from "@app/content";

const beneficialStatuses: Record<StatusEffect, boolean> = {
	stunned: false,
	silenced: false,
	haste: true,
};

export function isBeneficialStatus(statusId: StatusEffect): boolean {
	return beneficialStatuses[statusId];
}
