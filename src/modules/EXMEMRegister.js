class EXMEMRegister {
  pcShifted;
  ALUzero;
  ALUresult;
  readData2;
  writeRegister;

  control = {
    Branch: 0,
    MemRead: 0,
    MemWrite: 0,
    RegWrite: 0,
    MemToReg: 0,
  }

  update(pcShifted, ALUzero, ALUresult, readData2, writeRegister, control) {
    this.pcShifted = pcShifted;
    this.ALUzero = ALUzero;
    this.ALUresult = ALUresult;
    this.readData2 = readData2;
    this.writeRegister = writeRegister;

    this.control.Branch = control.Branch;
    this.control.MemRead = control.MemRead;
    this.control.MemWrite = control.MemWrite;
    this.control.RegWrite = control.RegWrite;
    this.control.MemToReg = control.MemToReg;
  }
}
