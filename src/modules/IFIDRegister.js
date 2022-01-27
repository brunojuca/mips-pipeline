class IFIDRegister {
  pc;
  instruction;

  update(pc, instruction) {
    this.instruction = instruction;
    this.pc = pc;
  }
}
