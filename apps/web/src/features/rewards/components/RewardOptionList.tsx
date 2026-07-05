import type { RewardChoiceOptionView } from "@app/engine";
import { RewardOptionCard } from "./RewardOptionCard";

type RewardOptionListProps = {
	options: readonly RewardChoiceOptionView[];
	selection: RewardChoiceOptionView | null;
	disabled: boolean;
	onSelect: (selection: RewardChoiceOptionView) => void;
};

export function RewardOptionList({
	options,
	selection,
	disabled,
	onSelect,
}: RewardOptionListProps) {
	return (
		<div className="grid gap-2" role="radiogroup" aria-label="Reward choices">
			{options.map((option) => (
				<RewardOptionCard
					key={`${option.type}-${option.optionIndex}`}
					option={option}
					selected={selection?.optionIndex === option.optionIndex}
					disabled={disabled}
					onSelect={() => onSelect(option)}
				/>
			))}
		</div>
	);
}
