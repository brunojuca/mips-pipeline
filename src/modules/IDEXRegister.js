class IDEXRegister {
  pc;
  readData1;
  readData2;
  funct;
  signExtend;
  rt;
  rd;

  control = {
    RegDst: 0,
    ALUOp0: 0,
    ALUOp1: 0,
    ALUSrc: 0,
    Branch: 0,
    MemRead: 0,
    MemWrite: 0,
    RegWrite: 0,
    MemToReg: 0,
  }

  update(pc, readData1, readData2, funct, signExtend, rt, rd) {
    this.pc = pc;
    this.readData1 = readData1;
    this.readData2 = readData2;
    this.funct = funct;
    this.signExtend = signExtend;
    this.rt = rt;
    this.rd = rd;
  }
}
