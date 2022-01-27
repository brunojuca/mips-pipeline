let inputMode = "";
let instructions = "";
let simulator;

function handleRadioClick() {
  let textDiv = document.getElementById("textInputDiv");
  let fileDiv = document.getElementById("fileInputDiv");
  let fileInput = document.getElementById("fileInput").checked;

  if (fileInput) {
    fileDiv.style.display = "block";
    textDiv.style.display = "none";
    inputMode = "file";
    console.log("Input mode is " + inputMode);
  } else {
    fileDiv.style.display = "none";
    textDiv.style.display = "block";
    inputMode = "text";
    console.log("Input mode is " + inputMode);
  }
}

function handleFileChange(event) {
  let file = event.target.files[0];

  if (!file) return;

  let reader = new FileReader();
  reader.onload = (event) => {
    instructions = event.target.result;
  };
  reader.readAsText(file);
}

function handleTextChange(event) {
  instructions = event.target.value;
}

function step() {
  if (instructions === "") {
    alert("No instructions were given to the simulator");
    return;
  }

  if (!simulator) simulator = new Simulator(instructions);

  simulator.step();
  if (simulator.clock)
    document.getElementById("clock").innerText = simulator.clock;
  if (simulator.pc) document.getElementById("pc").innerText = simulator.pc;

  const registers = {
    16: "s0",
    17: "s1",
    18: "s2",
    19: "s3",
    20: "s4",
    21: "s5",
    22: "s6",
    23: "s7",
    8: "t0",
    9: "t1",
    10: "t2",
    11: "t3",
    12: "t4",
    13: "t5",
    14: "t6",
    15: "t7",
    24: "t8",
    25: "t9",
    4: "a0",
    5: "a1",
    6: "a2",
    7: "a3",
    2: "v0",
    3: "v1",
  };

  for (const key in registers) {
    const value = registers[key];
    document.getElementById(value + "-value").innerText =
      simulator.registers.array[key];
  }

  if (simulator.instructionInIF)
    document.getElementById("ifBits").innerText =
      simulator.instructionInIF.concatInstruction.toString(2);
  if (simulator.instructionInID)
    document.getElementById("idBits").innerText =
      simulator.instructionInID.concatInstruction.toString(2);
  if (simulator.instructionInEX)
    document.getElementById("exBits").innerText =
      simulator.instructionInEX.concatInstruction.toString(2);
  if (simulator.instructionInMEM)
    document.getElementById("memBits").innerText =
      simulator.instructionInMEM.concatInstruction.toString(2);
  if (simulator.instructionInWB)
    document.getElementById("wbBits").innerText =
      simulator.instructionInWB.concatInstruction.toString(2);
}

function reset() {
  simulator = undefined;

  document.getElementById("ifBits").innerText = null;
  document.getElementById("idBits").innerText = null;
  document.getElementById("exBits").innerText = null;
  document.getElementById("memBits").innerText = null;
  document.getElementById("wbBits").innerText = null;
}

handleRadioClick();
