const express = require("express");
const cors = require("cors");
const os = require("os")
const { spawn } = require("child_process");
const app = express();
const pythonCommand = os.type() === "Windows_NT" ? "python" : "python3";
console.log(pythonCommand)
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});

app.get("/hello", (req, res) => {
  res.send("Hello TIger!");
});

app.post("/habitable-exoplanet-calculator", async (req, res) => {
  try {
    const habExoPlanetValues = req.body;

    console.log(
      "Received data from /habitable-exoplanet-calculator:",
      habExoPlanetValues
    );

    const pythonProcess = spawn(pythonCommand, [
      "main_calculator.py",
      JSON.stringify(habExoPlanetValues),
    ]);
    let pythonOutput = "";

    pythonProcess.stdout.on("data", (data) => {
      pythonOutput += data.toString();
    });
    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error from Python: ${data}`);
    });
    pythonProcess.on("close", (code) => {
      console.log(`Python process exited with code ${code}`);
      try {
        const resultPy = JSON.parse(pythonOutput);
        console.log(resultPy);
        res.status(200).json({ data: {result: resultPy} });
      } catch (e) {
        console.error("Error parsing JSON from Python output:", e);
        res.status(500).json({ message: "Error processing Python output" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/change-constant-values", (req, res) => {
  try {
    const changeConstValues = req.body;
    console.log(
      "Received data from /change-constant-values:",
      changeConstValues
    );
    const pythonProcess = spawn(pythonCommand, [
      "main_change.py",
      JSON.stringify(changeConstValues),
    ]);
    let pythonOutput = "";

    pythonProcess.stdout.on("data", (data) => {
      pythonOutput += data.toString();
    });
    pythonProcess.stderr.on("data", (data) => {
      console.log(data.toString());
    });
    pythonProcess.on("close", (code) => {
      console.log(`Python process exited with code ${code}`);
      try {
        const result = JSON.parse(pythonOutput);
        res.status(200).json({ count: result.length, data: result });
      } catch (e) {
        console.error("Error parsing JSON from Python output:", e);
        res.status(500).json({ message: "Error processing Python output" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
