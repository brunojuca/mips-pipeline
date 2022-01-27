class Simulator {
  instructionMemory = new InstructionMemory();
  registers = new Registers();
  alu = new ALU();
  dataMemory = new DataMemory();

  pc;
  clock;

  instructionFetched;

  instructionInIF;
  instructionInID;
  instructionInEX;
  instructionInMEM;
  instructionInWB;

  IFIDRegister = new IFIDRegister();
  IDEXRegister = new IDEXRegister();
  EXMEMRegister = new EXMEMRegister();
  MEMWBRegister = new MEMWBRegister();

  constructor(instructionsString) {
    this.instructionMemory.loadInstructions(instructionsString);
    this.instructionMemory.printArray();
    this.pc = 0;
    this.clock = 0;
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

    this.clock += 1;
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

    this.IFIDRegister.update(this.pc, this.instructionFetched);
  }

  instructionDecode() {
    if (!this.instructionInID) return;

    // test inst = 000000 10001 10010 01000 00000 100000
    let opcode = this.instructionInID.concatInstruction >>> 26;
    let rs = (this.instructionInID.concatInstruction << 6) >>> 27; // 17
    let rt = (this.instructionInID.concatInstruction << 11) >>> 27; // 18
    let rd = (this.instructionInID.concatInstruction << 16) >>> 27; // 8
    let shamt = (this.instructionInID.concatInstruction << 21) >>> 27; // 0
    let funct = (this.instructionInID.concatInstruction << 26) >>> 26; // 32
    let immediate = (this.instructionInID.concatInstruction << 16) >>> 16; // 16416
    let address = (this.instructionInID.concatInstruction << 6) >>> 6; // 36847648

    let readData1 = this.registers.array[rs];
    let readData2 = this.registers.array[rt];

    // sign extension considering negative numbers
    let signExtend =
      ((1 << 15) & immediate) === 0
        ? immediate
        : (((1 << 16) - 1) << 16) | immediate;

    this.IDEXRegister.update(
      this.IFIDRegister.pc,
      readData1,
      readData2,
      funct,
      signExtend,
      rt,
      rd
    );

    if (opcode === 0) {
      // add, sub, and, or, slt, sll, jr
      this.IDEXRegister.control.ALUOp0 = 1;
      this.IDEXRegister.control.ALUOp1 = 0;
      this.IDEXRegister.control.ALUSrc = 0;
      this.IDEXRegister.control.Branch = 0;
      this.IDEXRegister.control.MemRead = 0;
      this.IDEXRegister.control.MemWrite = 0;
      this.IDEXRegister.control.MemWrite = 0;
      this.IDEXRegister.control.MemToReg = 0;
      this.IDEXRegister.control.RegDst = 1;
      this.IDEXRegister.control.RegWrite = 1;
    } else if (opcode === 2) {
      // j
    } else if (opcode === 3) {
      // jal
    } else if (opcode === 4) {
      // beq
      this.IDEXRegister.control.ALUOp0 = 0;
      this.IDEXRegister.control.ALUOp1 = 1;
      this.IDEXRegister.control.ALUSrc = 0;
      this.IDEXRegister.control.Branch = 1;
      this.IDEXRegister.control.MemRead = 0;
      this.IDEXRegister.control.MemWrite = 0;
      this.IDEXRegister.control.MemWrite = 0;
      this.IDEXRegister.control.MemToReg = null;
      this.IDEXRegister.control.RegDst = null;
      this.IDEXRegister.control.RegWrite = 0;
    } else if (opcode === 5) {
      // bne
      this.IDEXRegister.control.ALUOp0 = 0;
      this.IDEXRegister.control.ALUOp1 = 1;
      this.IDEXRegister.control.ALUSrc = 0;
      this.IDEXRegister.control.Branch = 1;
      this.IDEXRegister.control.MemRead = 0;
      this.IDEXRegister.control.MemWrite = 0;
      this.IDEXRegister.control.MemWrite = 0;
      this.IDEXRegister.control.MemToReg = null;
      this.IDEXRegister.control.RegDst = null;
      this.IDEXRegister.control.RegWrite = 0;
    } else if (opcode === 8) {
      // addi
    } else if (opcode === 35) {
      // lw
      this.IDEXRegister.control.ALUOp0 = 0;
      this.IDEXRegister.control.ALUOp1 = 0;
      this.IDEXRegister.control.ALUSrc = 1;
      this.IDEXRegister.control.Branch = 0;
      this.IDEXRegister.control.MemRead = 1;
      this.IDEXRegister.control.MemWrite = 0;
      this.IDEXRegister.control.MemWrite = 0;
      this.IDEXRegister.control.MemToReg = 1;
      this.IDEXRegister.control.RegDst = 0;
      this.IDEXRegister.control.RegWrite = 1;
    } else if (opcode === 43) {
      // sw
      this.IDEXRegister.control.ALUOp0 = 0;
      this.IDEXRegister.control.ALUOp1 = 0;
      this.IDEXRegister.control.ALUSrc = 1;
      this.IDEXRegister.control.Branch = 0;
      this.IDEXRegister.control.MemRead = 0;
      this.IDEXRegister.control.MemWrite = 0;
      this.IDEXRegister.control.MemWrite = 1;
      this.IDEXRegister.control.MemToReg = null;
      this.IDEXRegister.control.RegDst = null;
      this.IDEXRegister.control.RegWrite = 0;
    }
  }

  execute() {
    // left shift 2
    let ls2 = this.IDEXRegister.signExtend << 2;

    // sum with pc
    let pcShifted = this.IDEXRegister.pc + ls2;

    // ALUControl
    let ALUControlCode;
    if (
      !(this.IDEXRegister.control.ALUOp0 && this.IDEXRegister.control.ALUOp1)
    ) {
      // 00
      ALUControlCode = 0b010; // (add)
    } else if (this.IDEXRegister.control.ALUOp1) {
      // X1 (branch)
      ALUControlCode = 0b110; // (sub)
    } else if (this.IDEXRegister.control.ALUOp0) {
      // arithmetic. check funct field.
      let last4bits = (this.IDEXRegister.funct << 28) >>> 28;
      if (last4bits === 0b0000) {
        ALUControlCode = 0b010; // (add)
      } else if (last4bits === 0b0010) {
        ALUControlCode = 0b110; // (sub)
      } else if (last4bits === 0b0100) {
        ALUControlCode = 0b000; // (and)
      } else if (last4bits === 0b0101) {
        ALUControlCode = 0b001; // (or)
      } else if (last4bits === 0b1010) {
        ALUControlCode = 0b111; // (slt)
      }
    }

    // defining ALUSrc (multiplexer)
    let aluSrcValue = this.IDEXRegister.control.ALUSrc
      ? this.IDEXRegister.signExtend
      : this.IDEXRegister.readData2;

    // ALU
    let [zero, result] = this.alu.operation(
      ALUControlCode,
      this.IDEXRegister.readData1,
      aluSrcValue
    );

    // defining write register
    let writeRegister = this.IDEXRegister.control.RegDst
      ? this.IDEXRegister.rd
      : this.IDEXRegister.rt;

    this.EXMEMRegister.update(
      pcShifted,
      zero,
      result,
      this.IDEXRegister.readData2,
      writeRegister,
      this.IDEXRegister.control
    );
  }

  memoryAccess() {
    let readData = null;

    if (this.EXMEMRegister.control.MemRead) {
      readData = this.dataMemory.readData(this.EXMEMRegister.ALUresult);
    }

    if (this.EXMEMRegister.control.MemWrite) {
      this.dataMemory.writeData(
        this.EXMEMRegister.ALUresult,
        this.EXMEMRegister.readData2
      );
    }

    this.MEMWBRegister.update(
      readData,
      this.EXMEMRegister.ALUresult,
      this.EXMEMRegister.writeRegister,
      this.EXMEMRegister.control
    );
  }

  writeBack() {
    if (this.MEMWBRegister.control.MemToReg === null) return;

    let writeData = this.MEMWBRegister.control.MemToReg
      ? this.MEMWBRegister.readData
      : this.MEMWBRegister.ALUResult;

    if (this.MEMWBRegister.control.RegWrite) {
      this.registers.array[this.MEMWBRegister.writeRegister] = writeData;
    }
  }
}
