class DataMemory {
  dataArray;
  size;

  constructor(size) {
    this.size = size;
    this.dataArray = new Array(size);
  }

  readData(address) {
    return this.dataArray[address/4];
  }

  writeData(address, value){
    this.dataArray[address/4] = value;
  }
}
