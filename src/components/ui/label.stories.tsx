import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./label";
import { Input } from "./input";

const meta = {
	title: "UI/Label",
	component: Label,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: "Email address" } };
export const WithInput: Story = {
	render: () => (
		<div className="space-y-2" style={{ width: 300 }}>
			<Label htmlFor="email">Email</Label>
			<Input id="email" placeholder="you@example.com" />
		</div>
	),
};
