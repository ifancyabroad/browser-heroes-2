import { FEATS_BY_ID, type AttackRider, type FeatId } from "@app/content";

export type ResolvedFeatAttackRider = {
	featId: FeatId;
	featName: string;
	riderIndex: number;
	rider: AttackRider;
};

export function collectFeatAttackRiders(featIds: readonly FeatId[]): ResolvedFeatAttackRider[] {
	return featIds.flatMap((featId) => {
		const feat = FEATS_BY_ID[featId];

		return feat.attackRiders.map((rider, riderIndex) => ({
			featId,
			featName: feat.name,
			riderIndex,
			rider,
		}));
	});
}
