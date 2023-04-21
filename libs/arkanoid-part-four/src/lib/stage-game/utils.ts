const randomProperty = <T>(obj: { [x: string]: T }): T => {
  const keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
};

const randomColour = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

export { randomProperty, randomColour };
