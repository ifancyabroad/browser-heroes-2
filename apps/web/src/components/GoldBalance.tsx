import { IconCoins } from "@tabler/icons-react";

type GoldBalanceProps = {
	gold: number;
};

export function GoldBalance({ gold }: GoldBalanceProps) {
	return (
		<div className="flex shrink-0 items-center gap-2 tabular-nums" aria-label={`${gold} gold`}>
			<IconCoins className="size-5 text-text-label" aria-hidden="true" />
			<span className="text-text-bright">{gold}</span>
		</div>
	);
}
