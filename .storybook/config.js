import { configure, addDecorator } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";
import centered from "@storybook/addon-centered";

addDecorator(centered);

setOptions({
  name: "Histoslider"
});

configure(() => require("../src/stories"), module);
