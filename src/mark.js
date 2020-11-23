export class Mark {
  constructor(data, channels = []) {
    this.data = data;
    this.channels = channels.filter(channel => {
      const {name, value, optional} = channel;
      if (value === undefined) {
        if (optional) return false;
        throw new Error(`missing channel value: ${name}`);
      }
      return true;
    });
  }
  initialize(data) {
    return this.channels.map(channel => {
      const {name} = channel;
      return [name, Channel(data, channel)];
    });
  }
}

function Channel(data, {scale, type, value, label}) {
  if (typeof value === "string") label = value, value = Array.from(data, field(value));
  else if (typeof value === "function") value = Array.from(data, value);
  else if (typeof value.length !== "number") value = Array.from(value);
  return {scale, type, value, label};
}

export const field = value => d => d[value];
export const indexOf = (d, i) => i;
export const identity = d => d;
export const zero = () => 0;
export const string = x => x == null ? null : x + "";
export const number = x => x == null ? null : +x;