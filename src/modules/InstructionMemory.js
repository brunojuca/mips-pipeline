class InstructionMemory {
  instructionsArray;

  constructor() {}

  #addInstruction(reference, instructionString) {
    this.instructionsArray[reference * 4 + 0] = parseInt(
      instructionString.slice(0, 8),
      2
    );
    this.instructionsArray[reference * 4 + 1] = parseInt(
      instructionString.slice(8, 16),
      2
    );
    this.instructionsArray[reference * 4 + 2] = parseInt(
      instructionString.slice(16, 24),
      2
    );
    this.instructionsArray[reference * 4 + 3] = parseInt(
      instructionString.slice(24, 32),
      2
    );
  }

  loadInstructions(instructionsString) {
    let arr = instructionsString.split("\n");
    arr = arr.filter(String);
    this.instructionsArray = new Uint8Array(4 * arr.length);

    arr.forEach((inst, index) => {
      let onlyInst = inst.slice(0, 32);
      this.#addInstruction(index, onlyInst);
    });
  }

  getByte(address) {
    if (address >= this.instructionsArray.length) {
      return null;
    }
    return this.instructionsArray[address];
  }

  dec2bin(dec) {
    return (dec >>> 0).toString(2);
  }

  printArray() {
    if (!this.instructionsArray instanceof Uint8Array) return;
    this.instructionsArray.forEach((byte, index) => {
    });
  }
}
