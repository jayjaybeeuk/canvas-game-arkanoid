const randomProperty = <T>(obj: { [x: string]: T }) => {
  const keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
};

export { randomProperty };
