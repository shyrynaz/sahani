import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "./slider";

const meta = {
	title: "UI/Slider",
	component: Slider,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultValue: [50] } };
export const WithRange: Story = { args: { defaultValue: [25, 75] } };
export const Min: Story = { args: { defaultValue: [0] } };
export const Max: Story = { args: { defaultValue: [100] } };
