import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./progress";

const meta = {
	title: "UI/Progress",
	component: Progress,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = { args: { value: 0 } };
export const Partial: Story = { args: { value: 60 } };
export const Full: Story = { args: { value: 100 } };
