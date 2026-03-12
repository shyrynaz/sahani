import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "./separator";

const meta = {
	title: "UI/Separator",
	component: Separator,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
	render: () => (
		<div style={{ width: 300 }}>
			<p className="text-sm">Above</p>
			<Separator className="my-4" />
			<p className="text-sm">Below</p>
		</div>
	),
};

export const Vertical: Story = {
	render: () => (
		<div className="flex items-center gap-4 h-10">
			<span className="text-sm">Left</span>
			<Separator orientation="vertical" />
			<span className="text-sm">Right</span>
		</div>
	),
};
