import { IconArrowLeft, IconDice } from "@tabler/icons-react";
import { IconButton } from "../../../components/Button";
import { Tooltip } from "../../../components/Tooltip";

type ShopNavigationActionsProps = {
	rerollCost: number;
	canReroll: boolean;
	isPending: boolean;
	onBack: () => void;
	onReroll: () => void;
};

export function ShopNavigationActions({
	rerollCost,
	canReroll,
	isPending,
	onBack,
	onReroll,
}: ShopNavigationActionsProps) {
	return (
		<>
			<Tooltip content="Back to town" referenceTabIndex={null} mobileBehavior="disabled">
				<IconButton aria-label="Back to town" onClick={onBack}>
					<IconArrowLeft className="h-6 w-6" aria-hidden="true" />
				</IconButton>
			</Tooltip>
			<Tooltip content="Reroll shop" referenceTabIndex={null} mobileBehavior="disabled">
				<IconButton
					variant="primary"
					aria-label="Reroll shop"
					disabled={isPending || !canReroll}
					onClick={onReroll}
				>
					<IconDice className="h-6 w-6" aria-hidden="true" />
				</IconButton>
			</Tooltip>
			<span
				className={
					canReroll ? "ml-1 tabular-nums text-text" : "ml-1 tabular-nums text-error"
				}
			>
				{rerollCost}g
			</span>
		</>
	);
}
