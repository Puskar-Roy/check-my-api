#!/usr/bin/env node

const commander = require("commander");
const { prompt } = require("enquirer");
const axios = require("axios");

const { runCLI } = require("./package/RestProvider");

const servicePrompt = {
  type: "select",
  name: "service",
  message: "🔄 Select a Service:",
  choices: ["REST API", "Web Socket", "Socket.io"],
};

const program = new commander.Command();
const main = async () => {
  const serviceans = await prompt(servicePrompt);
  if (serviceans.service === "REST API") {
    runCLI();
  }
};

main();
