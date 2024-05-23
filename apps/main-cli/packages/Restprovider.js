#!/usr/bin/env node

const commander = require("commander");
const { prompt } = require("enquirer");
const axios = require("axios");
const program = new commander.Command();

const questions = [
  {
    type: "input",
    name: "api",
    message: "Enter the API link:",
    validate: (value) => (value ? true : "API link is required"),
  },
  {
    type: "select",
    name: "req",
    message: "Select the request type:",
    choices: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    default: "GET",
  },
  {
    type: "input",
    name: "head",
    message: "Enter the Auth Header (if any):",
  },
  {
    type: "input",
    name: "cookie",
    message: "Enter the cookie token (if any):",
    default: "Bearer ",
  },
  {
    type: "input",
    name: "data",
    message: "Enter the Data (JSON format):",
    validate: (value) => {
      if (!value) return true;
      try {
        JSON.parse(value);
        return true;
      } catch (error) {
        return "Invalid JSON format";
      }
    },
    when: (answers) => ["POST", "PUT", "PATCH"].includes(answers.req),
  },
];

program
  .option("-t, --type <type>", "Add Server type", "REST")
  .option("-a, --api <type>", "Add the API link", "")
  .option("-r, --req <type>", "Add the specified Request Type", "GET")
  .option("-h, --head <type>", "Add the Auth Header", "")
  .option("-c, --cookie <type>", "Add the cookie token", "Bearer ")
  .option("-e, --event <type>", "Add Socket.io event", "join")
  .option("-m, --message <type>", "Add Socket.io message", "Hello, There!")
  .option("-d, --data <type>", "Add the Data", "");

program.parse();

const runCLI = async () => {
  const options = program.opts();
  let config = options;

  if (!options.api || !options.req) {
    const answers = await prompt(questions);
    config = { ...config, ...answers };
  }

  const headers = {};
  if (config.head) headers["Authorization"] = config.head;
  if (config.cookie) headers["Cookie"] = config.cookie;

  const data = config.data ? JSON.parse(config.data) : {};

  try {
    let response;
    switch (config.req.toUpperCase()) {
      case "GET":
        response = await axios.get(config.api, { headers });
        break;
      case "POST":
        response = await axios.post(config.api, data, { headers });
        break;
      case "PUT":
        response = await axios.put(config.api, data, { headers });
        break;
      case "PATCH":
        response = await axios.patch(config.api, data, { headers });
        break;
      case "DELETE":
        response = await axios.delete(config.api, { headers });
        break;
      default:
        console.error(`Unsupported request type: ${config.req}`);
        return;
    }

    console.log(`Status: ${response.status}`);
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error.message);
    if (error.response) {
      console.error("Response Status:", error.response.status);
      console.error("Response Data:", error.response.data);
    }
  }
};

module.exports = { runCLI };
