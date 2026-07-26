import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DataTable, DataTableCell, DataTableRow, DataTableRowAction } from "./DataTable";

describe("DataTableRow", () => {
	it("activates by row pointer input and exposes a named action", () => {
		const onSelect = vi.fn();

		render(
			<DataTable>
				<tbody>
					<DataTableRow onSelect={onSelect}>
						<DataTableCell>
							<DataTableRowAction label="Inspect hero Aria" onSelect={onSelect}>
								Aria
							</DataTableRowAction>
						</DataTableCell>
					</DataTableRow>
				</tbody>
			</DataTable>,
		);

		const row = screen.getByRole("row");
		const action = screen.getByRole("button", { name: "Inspect hero Aria" });
		expect(row).not.toHaveAttribute("tabindex");
		expect(action).toHaveClass("cursor-pointer");

		fireEvent.click(row);
		fireEvent.click(action);

		expect(onSelect).toHaveBeenCalledTimes(2);
	});

	it("leaves ordinary rows out of the keyboard tab order", () => {
		render(
			<DataTable>
				<tbody>
					<DataTableRow>
						<DataTableCell>Ghost</DataTableCell>
					</DataTableRow>
				</tbody>
			</DataTable>,
		);

		expect(screen.getByRole("row")).not.toHaveAttribute("tabindex");
	});
});
