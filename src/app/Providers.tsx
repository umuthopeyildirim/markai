"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<NextUIProvider className="flex min-h-full flex-1 flex-col">
				{children}
			</NextUIProvider>
		</Provider>
	);
}
