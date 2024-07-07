export type ResponseToken = {
    model: string,
    response: string,
    done: boolean,
}

export type PreProcessedPrompt = {
    model: string,
    raw: boolean,
    prompt: string,
    options: {
        stop: string[],
        num_predict: number,
        temperature: number,
    }
}

export type ModalConfig = {
    name: string,
    prefix: string,
    suffix: string,
    midfill: string,
    stop: string[]
}

export type LanguageConfig = {
    name: string,
    fileExtensions: string[],
    comment: {
        startIdentifier: string,
        multilineIndentifier: string | null,
        endIdentifier: string | null
    }
}

export type Config = {
    backendType: string,
    inferenceUrl: string,
    paused: boolean,
    ignoreList: string[],
}