import React, { Component } from "react";
import { storiesOf, linkTo } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Histogram, Histoslider, Slider } from "..";

const stressTestData = (n, offset = 0, multiplier = 1) =>
  Array.from(Array(n)).map((d, i) => ({
    x0: (i + offset) * multiplier,
    x: (i + 1 + offset) * multiplier,
    y: (i % 5 + 1) * 10
  }));

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

// Stateful container for testing interaction
class HistosliderContainer extends Component {
  state = {
    selection: null
  };
  setSelection = selection => {
    action("setSelection");
    this.setState({ selection });
  };
  render = () =>
    <Histoslider
      // An array of data to show on the slider
      data={buckets}
      // A function to handle a change in the selection
      selection={this.state.selection}
      onChange={this.setSelection}
      {...this.props}
    />;
}
storiesOf("Histogram", module);
storiesOf("Slider", module);
storiesOf("Histoslider", module)
  .add("Open", () => <HistosliderContainer />)
  .add("Show on drag", () => <HistosliderContainer showOnDrag />)
  .add("More data", () =>
    <HistosliderContainer data={stressTestData(50)} width={800} />
  )
  .add("Non zero start", () =>
    <HistosliderContainer data={stressTestData(200, 2000, 10)} width={800} />
  )
  .add("Stepping in lots of 100", () =>
    <HistosliderContainer
      keyboardStep={100}
      data={stressTestData(20, 1, 10)}
      width={800}
    />
  );
