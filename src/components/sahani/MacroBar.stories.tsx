import type { Meta, StoryObj } from "@storybook/react-vite";
import { MacroBar } from "./MacroBar";

const meta = {
	title: "Sahani/MacroBar",
	component: MacroBar,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{ width: 300 }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof MacroBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Protein",
		value: 75,
		target: 150,
		color: "blue",
	},
};

export const HighProgress: Story = {
	args: {
		label: "Carbs",
		value: 220,
		target: 250,
		color: "amber",
	},
};

export const Overflow: Story = {
	args: {
		label: "Fat",
		value: 80,
		target: 65,
		color: "red",
	},
};

export const Green: Story = {
	args: {
		label: "Calories",
		value: 1200,
		target: 2000,
		color: "green",
	},
};

export const Cyan: Story = {
	args: {
		label: "Hydration",
		value: 1200,
		target: 2500,
		color: "cyan",
	},
};

export const Small: Story = {
	args: {
		label: "Protein",
		value: 75,
		target: 150,
		color: "blue",
		size: "sm",
		showValues: false,
	},
};
