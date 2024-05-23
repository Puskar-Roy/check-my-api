#!/usr/bin/env node

const { prompt } = require("enquirer");

const { runCLI } = require("./packages/Restprovider");

const servicePrompt = {
  type: "select",
  name: "service",
  message: "🔄 Select a Service:",
  choices: ["REST API", "Web Socket", "Socket.io"],
};

const main = async () => {
  const serviceans = await prompt(servicePrompt);
  if (serviceans.service === "REST API") {
    runCLI();
  }
};

main();
