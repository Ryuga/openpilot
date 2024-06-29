import { ModalConfig } from "./types";

export const modelConfig: { [key: string]: ModalConfig }= {
    // To add support to a new model add the config here with the corresponding values.
    "codellama:*": {
        name: "Codelama",
        prefix: "<PRE>",
        suffix: "<SUF>",
        midfill: "<MID>",
        stop: ["<END>", "<EOD>", "<EOT>"]
    },
    "llama-2-7b:*": {
        name: "Llama 2 7B",
        prefix: "<PRE>",
        suffix: "<SUF>",
        midfill: "<MID>",
        stop: ["<END>", "<EOD>", "<EOT>"]
    },
    "llama-2-13b:*": {
        name: "Llama 2 13B",
        prefix: "<PRE>",
        suffix: "<SUF>",
        midfill: "<MID>",
        stop: ["<END>", "<EOD>", "<EOT>"]
    },
    "stable-code:*": {
        name: "Stable Code",
        prefix: "<fim_prefix>",
        suffix: "<fim_suffix>",
        midfill: "<fim_middle>",
        stop: ["<|endoftext|>"]
    }
}


export function getModelConfig(name: string): ModalConfig{
    // use regex pattern matching to identify the current model and return config.
    // incase model provided is not found codellama will be used as default.
    let match = Object.keys(modelConfig).find((pattern) => name.match(pattern));
    console.log(match ? "Model detected: " + modelConfig[match].name : "Using default model")
    return match ? modelConfig[match] : modelConfig.codelama;
} 