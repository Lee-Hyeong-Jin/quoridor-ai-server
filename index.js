const express = require("express");
const AI = require("./src/model");
const app = express();
const port = 8080;

const bodyParser = require("body-parser");

app.use(bodyParser.json());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/choose/next/move", (req, res) => {
  const level = req.body.level;
  const response = {
    code: 200,
    data: {},
    message: "",
  };
  switch (level) {
    case 1:
      response.data.numOfSimulations = 2500;
      break;
    case 2:
      response.data.numOfSimulations = 7500;
      break;
    case 3:
      response.data.numOfSimulations = 20000;
      break;
    case 4:
      response.data.numOfSimulations = 60000;
      break;
    default:
      response.code = 500;
      break;
  }
  const ai = new AI(response.data.numOfSimulations, 0.2);
  if (response.code == 500) {
    return res.status(500).json({
      code: 500,
      data: null,
      message: "Internal Server Error",
    });
  }
  response.code = 200;
  response.data.move = ai.chooseNextMove(req.body.game);
  response.message = "success!!";
  return res.status(200).json(response);
});

app.listen(port, () => {
  console.log("ai is running in port 8080");
});
