import { useState } from "react";
import { Modal } from "../../../components/Modal";
import { Button } from "../../../components/Button";

type HeroNameModalProps = {
	open: boolean;
	isSubmitting?: boolean;
	onClose: () => void;
	onConfirm: (heroName: string) => void;
};

export function HeroNameModal({
	open,
	isSubmitting = false,
	onClose,
	onConfirm,
}: HeroNameModalProps) {
	const [heroName, setHeroName] = useState("");

	const trimmedName = heroName.trim();

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setHeroName(event.target.value);
	}

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		if (!trimmedName) {
			return;
		}

		onConfirm(trimmedName);
	}

	return (
		<Modal
			open={open}
			title="Name your hero"
			onClose={onClose}
			closeOnBackdropClick={!isSubmitting}
			footer={
				<>
					<Button type="button" onClick={onClose} disabled={isSubmitting}>
						Cancel
					</Button>

					<Button
						type="submit"
						form="hero-name-form"
						disabled={!trimmedName || isSubmitting}
						className="text-primary"
					>
						{isSubmitting ? "Creating..." : "Start Game"}
					</Button>
				</>
			}
		>
			<form id="hero-name-form" onSubmit={handleSubmit}>
				<input
					id="hero-name-input"
					type="text"
					value={heroName}
					onChange={handleChange}
					disabled={isSubmitting}
					autoComplete="off"
					className="w-full border-2 border-border bg-bg-base px-3 py-2 caret-primary outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
					autoFocus
				/>
			</form>
		</Modal>
	);
}
