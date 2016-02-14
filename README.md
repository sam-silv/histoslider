# histoslider [![Circle CI](https://circleci.com/gh/samhogg/histoslider.svg?style=svg)](https://circleci.com/gh/samhogg/histoslider)

A D3 based histogram slider component for React. Useful for exploring distributions of things within data visualisations.

## Usage

`npm install --save histoslider`

Yay, glad we got that out of the way.

### Component
```JSX
  <Histoslider
    // An array of data to show on the slider
    data={[0, 1, 2, 2, 3, 4, 4, 5, 5, 5, 6, 6, 7]}
    // The start of the histogram, defaults to the minimum value in the array
    start={0}
    // The end of the histogram, defaults to the maximum value in the array
    end={10}
    // The size of the histogram buckets, defaults 1
    bucketSize={1}
    // How much to pad the slider and histogram by, defaults to 20
    padding={20}
    // The extent of the selection, this doesn't have to be sorted (and you shouldn't sort it to store it)
    selection={[number, number]}
    // A function to handle a change in the selection
    onChange={array => { console.log(array) }}
    // Set showOnDrag to enable slide up behavior
    showOnDrag
  />
```

A few things in the works, including just passing buckets to Histoslider, and tests.

## Development

`npm run dev`

I'm using [Standard]() for this project, although if that gets in the way I'm more than happy to consider other options.
