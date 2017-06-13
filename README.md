# histoslider [![Circle CI](https://circleci.com/gh/samhogg/histoslider.svg?style=svg)](https://circleci.com/gh/samhogg/histoslider)

[![Greenkeeper badge](https://badges.greenkeeper.io/samhogg/histoslider.svg)](https://greenkeeper.io/)

A D3 based histogram slider component for React. Useful for exploring distributions of things within data visualisations.

## Usage

`yarn add histoslider`

Yay, glad we got that out of the way.

### Component
```JSX
  <Histoslider
    // An array of objects to create the histogram
    data={[
      {
        x0: 0,    // Start of the bucket
        x: 1,     // End of the bucket
        y: 100    // Value
      },
      {
        x0: 1,    // Start of the bucket
        x: 2,     // End of the bucket
        y: 120    // Value
      },
      ...
    ]}
    // How much to pad the slider and histogram by, defaults to 20
    padding={20}
    // The extent of the selection, this doesn't have to be sorted (and you shouldn't sort it to store it)
    selection={[number, number]}
    // A function to handle a change in the selection
    onChange={array => { console.log(array) }}
  />
```
## Development

`yarn start`

Hack away :)
