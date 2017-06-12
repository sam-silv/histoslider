import React from "react";
import { storiesOf, action, linkTo } from "@storybook/react";
import { Histogram, Histoslider, Slider } from "..";

const buckets = [
  {
    x0: 0,
    x: 1,
    y: 8
  },
  {
    x0: 1,
    x: 2,
    y: 2
  },
  {
    x0: 2,
    x: 3,
    y: 0
  },
  {
    x0: 3,
    x: 4,
    y: 2
  }
];

storiesOf("Histogram", module);
storiesOf("Slider", module);
storiesOf("Histoslider", module).add("default open", () =>
  <Histoslider
    // An array of data to show on the slider
    data={buckets}
    // A function to handle a change in the selection
    onChange={array => {
      console.log(array);
    }}
  />
);
