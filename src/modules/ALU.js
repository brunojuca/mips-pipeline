class ALU {
  operation(code, first, second) {
    if (code === 0b010) {
      let add = first + second;
      return [add === 0, add];
    } else if (code === 0b110) {
      let sub = first - second;
      return [sub === 0, sub];
    } else if (code === 0b000) {
      let and = first & second;
      return [and === 0, and];
    } else if (code === 0b001) {
      let or = first | second;
      return [or === 0, or];
    } else if (code === 0b111) {
      let slt = first < second;
      return [slt === 0, slt];
    } else if (code === 0b011) {
      // TODO search if this is the write way
      let sll = second << first;
      return [sll === 0, sll];
    }
  }
}
