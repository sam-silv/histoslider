import { configure } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";

setOptions({
  name: "Histoslider"
});

configure(() => require("../src/stories"), module);
