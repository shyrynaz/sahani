import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./input";

const meta = {
	title: "UI/Input",
	component: Input,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithPlaceholder: Story = { args: { placeholder: "Enter your email..." } };
export const Disabled: Story = { args: { placeholder: "Disabled", disabled: true } };
export const WithValue: Story = { args: { defaultValue: "hello@sahani.app" } };
