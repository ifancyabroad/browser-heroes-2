import { IconCoins } from "@tabler/icons-react";

type TownGoldBalanceProps = {
	gold: number;
};

export function TownGoldBalance({ gold }: TownGoldBalanceProps) {
	return (
		<div className="flex shrink-0 items-center gap-2 tabular-nums" aria-label={`${gold} gold`}>
			<IconCoins className="h-5 w-5 text-text-label" aria-hidden="true" />
			<span className="text-text-bright">{gold}</span>
		</div>
	);
}
