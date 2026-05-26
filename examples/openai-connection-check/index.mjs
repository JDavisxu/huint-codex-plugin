import OpenAI from "openai";

const requiredEnv = ["OPENAI_API_KEY", "OPENAI_MODEL", "HUINT_API_KEY", "HUINT_MCP_URL"];
const missingEnv = requiredEnv.filter((name) => !process.env[name]?.trim());

if (missingEnv.length > 0) {
  console.error(`Missing required environment variable(s): ${missingEnv.join(", ")}`);
  console.error("Create .env from .env.example, fill it in, then run npm start.");
  process.exit(1);
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await client.responses.create({
  model: process.env.OPENAI_MODEL,
  tools: [
    {
      type: "mcp",
      server_label: "huint",
      server_description:
        "Huint hosted MCP server for operator and agent task workflows.",
      server_url: process.env.HUINT_MCP_URL,
      authorization: `Bearer ${process.env.HUINT_API_KEY}`,
      require_approval: "never",
      allowed_tools: ["get_connection_status"],
    },
  ],
  input:
    "Use the Huint MCP get_connection_status tool and return only the connection result JSON.",
});

console.log(response.output_text ?? JSON.stringify(response, null, 2));
