import React, { Component } from "react";
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

// Stateful container for testing interaction
class HistosliderContainer extends Component {
  state = {
    selection: null
  };
  setSelection = selection => this.setState({ selection });
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

const containerFactory = props => <HistosliderContainer {...props} />;

storiesOf("Histogram", module);
storiesOf("Slider", module);
storiesOf("Histoslider", module)
  .add("Open", () => containerFactory())
  .add("Show on drag", () =>
    containerFactory({
      showOnDrag: true
    })
  );
