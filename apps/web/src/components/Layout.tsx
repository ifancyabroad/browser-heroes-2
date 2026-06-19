import type { PropsWithChildren } from "react";

export function Layout({ children }: PropsWithChildren) {
	return <main className="min-h-screen flex flex-col">{children}</main>;
}
