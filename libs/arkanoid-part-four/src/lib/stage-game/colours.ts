type colour = `#${string}`;

type Colours = {
  blue: colour;
  red: colour;
  black: colour;
  white: colour;
};

type BrickColours = {
  blue: colour;
  red: colour;
};

const colours: Colours = {
  blue: '#0095DD',
  red: '#FF0000',
  black: '#000000',
  white: '#FFFFFF',
};

const brickColours: BrickColours = {
  blue: '#0095DD',
  red: '#FF0000',
};

export { brickColours, colours, Colours };
