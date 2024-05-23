
const servicePrompt = {
  type: "select",
  name: "service",
  message: "🔄 Select a Service:",
  choices: ["REST API", "Web Socket", "Socket.io"],
};

module.exports = { servicePrompt };