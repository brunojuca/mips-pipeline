class Instruction {
    rawInstruction = new Uint8Array(4);
    concatInstruction;
    
    constructor(byte0, byte1, byte2, byte3) {
        this.rawInstruction[0] = byte0;
        this.rawInstruction[1] = byte1;
        this.rawInstruction[2] = byte2;
        this.rawInstruction[3] = byte3;

        this.concatInstruction = (((((byte0 << 8) + byte1) << 8) + byte2) << 8) + byte3
    }
}