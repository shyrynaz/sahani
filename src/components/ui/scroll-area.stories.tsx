import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea } from "./scroll-area";

const meta = {
	title: "UI/ScrollArea",
	component: ScrollArea,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
	render: () => (
		<ScrollArea className="h-[200px] w-[300px] rounded-md border p-4">
			{Array.from({ length: 20 }, (_, i) => (
				<div key={i} className="py-2 text-sm">Recipe item {i + 1}</div>
			))}
		</ScrollArea>
	),
};

export const Horizontal: Story = {
	render: () => (
		<ScrollArea className="w-[300px] whitespace-nowrap rounded-md border">
			<div className="flex w-max space-x-4 p-4">
				{Array.from({ length: 10 }, (_, i) => (
					<div key={i} className="w-[150px] shrink-0 rounded-md border p-4">
						Card {i + 1}
					</div>
				))}
			</div>
		</ScrollArea>
	),
};
