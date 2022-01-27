class MEMWBRegister {
  readData;
  ALUResult;
  writeRegister;

  control = {
    RegWrite: 0,
    MemToReg: 0,
  }

  update(readData, ALUResult, writeRegister, control) {
    this.readData = readData;
    this.ALUResult = ALUResult;
    this.writeRegister = writeRegister;

    this.control.RegWrite = control.RegWrite;
    this.control.MemToReg = control.MemToReg;
  }
}
