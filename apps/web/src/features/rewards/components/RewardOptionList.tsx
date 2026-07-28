import type { RewardChoiceOptionView } from "@app/engine";
import { RadioGroup } from "radix-ui";
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
	function handleValueChange(value: string) {
		const option = options.find((candidate) => candidate.optionIndex.toString() === value);
		if (option) {
			onSelect(option);
		}
	}

	return (
		<RadioGroup.Root
			value={selection?.optionIndex.toString() ?? ""}
			onValueChange={handleValueChange}
			disabled={disabled}
			className="grid gap-2"
			aria-label="Reward choices"
		>
			{options.map((option) => (
				<RewardOptionCard
					key={`${option.type}-${option.optionIndex}`}
					option={option}
					value={option.optionIndex.toString()}
					disabled={disabled}
				/>
			))}
		</RadioGroup.Root>
	);
}
