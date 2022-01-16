class Simulator {
  instructionMemory;

  pc;
  clock;

  instructionFetched;

  instructionInIF;
  instructionInID;
  instructionInEX;
  instructionInMEM;
  instructionInWB;

  constructor(instructionsString) {
    this.instructionMemory = new InstructionMemory();
    this.instructionMemory.loadInstructions(instructionsString);
    this.instructionMemory.printArray();
    this.pc = 0;
  }

  updatePipeline() {
    this.instructionInWB = this.instructionInMEM;
    this.instructionInMEM = this.instructionInEX;
    this.instructionInEX = this.instructionInID;
    this.instructionInID = this.instructionInIF;
  }

  step() {
    this.updatePipeline();
    this.instructionFetch();
  }

  instructionFetch() {
    let byte0 = this.instructionMemory.getByte(this.pc);
    let byte1 = this.instructionMemory.getByte(this.pc + 1);
    let byte2 = this.instructionMemory.getByte(this.pc + 2);
    let byte3 = this.instructionMemory.getByte(this.pc + 3);

    this.instructionFetched = new Instruction(byte0, byte1, byte2, byte3);

    this.instructionInIF = this.instructionFetched;

    // Update pc value
    this.pc += 4;
  }

  instructionDecode() {}
}
