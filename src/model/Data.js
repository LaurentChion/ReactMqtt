export class Data {
  constructor() {
    this.data = null;
  }
}

export class Datum extends Data {
  constructor(val) {
    super();
    this.val = val;
  }

  get value() {
    return this.val;
  }
  set value(val) {
    this.val = val;
  }
  toString() {
    return `${this.value}`;
  }
}

export class TimeSeries extends Data {
  constructor(labels, values) {
    super();
    if (labels.length === values.length) {
      this.val = values;
      this.lab = labels;
    } else {
      throw new Error('Length of values not equals as length of labels.');
    }
  }
  // TODO TimeSeries : avoir des get et set sur un élément i
  get values() {
    return this.val;
  }
  set values(val) {
    this.val = val;
  }
  get labels() {
    return this.lab;
  }
  set labels(lab) {
    this.lab = lab;
  }
  toString() {
    return `${this.values},${this.labels} `;
  }
}
