import type { Meta, StoryObj } from "@storybook/react-vite";
import { NutritionRing } from "./NutritionRing";

const meta = {
	title: "Sahani/NutritionRing",
	component: NutritionRing,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof NutritionRing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
	args: {
		value: 0,
		target: 2000,
		label: "Calories",
	},
};

export const Partial: Story = {
	args: {
		value: 1200,
		target: 2000,
		label: "Calories",
	},
};

export const Full: Story = {
	args: {
		value: 2000,
		target: 2000,
		label: "Calories",
	},
};

export const Overflow: Story = {
	args: {
		value: 2500,
		target: 2000,
		label: "Calories",
	},
};

export const Small: Story = {
	args: {
		value: 800,
		target: 2000,
		label: "Calories",
		size: "sm",
	},
};

export const Large: Story = {
	args: {
		value: 1500,
		target: 2000,
		label: "Calories",
		size: "lg",
	},
};
