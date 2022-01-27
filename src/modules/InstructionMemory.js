class InstructionMemory {
  instructionsArray;

  constructor() {}

  #addInstruction(reference, instructionString) {
    // console.log("ref: " + reference);
    // console.log("inst: " + instructionString);
    // console.log("slice1: " + instructionString.slice(0, 8));
    // console.log("slice2: " + instructionString.slice(8, 16));
    // console.log("slice3: " + instructionString.slice(16, 24));
    // console.log("slice4: " + instructionString.slice(24, 32));
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
    // console.log(arr);
    this.instructionsArray = new Uint8Array(4 * arr.length);

    arr.forEach((inst, index) => {
      this.#addInstruction(index, inst);
    });
  }

  getByte(address) {
    return this.instructionsArray[address];
  }

  dec2bin(dec) {
    return (dec >>> 0).toString(2);
  }

  printArray() {
    if (!this.instructionsArray instanceof Uint8Array) return;
    this.instructionsArray.forEach((byte, index) => {
      console.log(index + ": " + (byte >>> 0).toString(2));
    });
  }
}
