class Registers {
  array = new Array(32);

  constructor() {
    this.array.fill(-1);
    //testing
    this.array[9] = 0;
    this.array[10] = 2;
    this.array[11] = 4;
  }
}
