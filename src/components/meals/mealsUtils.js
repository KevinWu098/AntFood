"use server";

const { TextServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/text-bison-001";
const API_KEY = "AIzaSyDN53cxupwd-p8RnOsXRGmGiGSDuzJuHdc";

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

export async function queryBard(mealData) {
  const promptString = `JSON: ${JSON.stringify(
    mealData,
  )} Return JSON object, healthiest, no context`;
  const stopSequences = [];

  const result = await client.generateText({
    // required, which model to use to generate the result
    model: MODEL_NAME,
    // optional, 0.0 always uses the highest-probability result
    temperature: 0.7,
    // optional, how many candidate results to generate
    candidateCount: 1,
    // optional, number of most probable tokens to consider for generation
    top_k: 40,
    // optional, for nucleus sampling decoding strategy
    top_p: 0.95,
    // optional, maximum number of output tokens to generate
    max_output_tokens: 1024,
    // optional, sequences at which to stop model generation
    stop_sequences: stopSequences,
    // optional, safety settings
    safety_settings: [
      { category: "HARM_CATEGORY_DEROGATORY", threshold: 4 },
      { category: "HARM_CATEGORY_TOXICITY", threshold: 4 },
      { category: "HARM_CATEGORY_VIOLENCE", threshold: 4 },
      { category: "HARM_CATEGORY_SEXUAL", threshold: 4 },
      { category: "HARM_CATEGORY_MEDICAL", threshold: 4 },
      { category: "HARM_CATEGORY_DANGEROUS", threshold: 4 },
    ],
    prompt: {
      text: promptString,
    },
  });

  let output = result[0].candidates[0].output;

  if (output[0] === "`" && output[output.length - 1] === "`") {
    output = output.slice(3, output.length - 3);
  }

  if (output.slice(0, 4) === "json") {
    output = output.slice(4);
  }

  if (output[0] === "[" && output[output.length - 1] === "]") {
    output = JSON.parse(output)[0];
  }

  return output;
}
