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

  if (!simulator)
    simulator = new Simulator(instructions);

  simulator.step();
  if (simulator.instructionInIF) document.getElementById("ifBits").innerText = simulator.instructionInIF.concatInstruction.toString(2);
  if (simulator.instructionInID) document.getElementById("idBits").innerText = simulator.instructionInID.concatInstruction.toString(2);
  if (simulator.instructionInEX) document.getElementById("exBits").innerText = simulator.instructionInEX.concatInstruction.toString(2);
  if (simulator.instructionInMEM) document.getElementById("memBits").innerText = simulator.instructionInMEM.concatInstruction.toString(2);
  if (simulator.instructionInWB) document.getElementById("wbBits").innerText = simulator.instructionInWB.concatInstruction.toString(2);
  
}

handleRadioClick();
