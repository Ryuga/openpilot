import vscode from 'vscode';
import { getLanguageConfig } from '../core/language';
import { getModelConfig } from '../core/models';
import { LanguageConfig, PreProcessedPrompt } from '../core/types';
let config = {
    model: "stable-code:3b-code-q4_0" 
}


export const getFormattedModalPrompt = (prefix: string, suffix: string, language: LanguageConfig): PreProcessedPrompt => {
    let modelConfig = getModelConfig(config.model) 
    let langComment = `${language.comment.startIdentifier} Language: ${language.name} \n ${language.comment.endIdentifier ? language.comment.endIdentifier : ''}`
    return {
        model: config.model,
        raw: true,
        prompt: modelConfig.prefix + langComment + prefix + modelConfig.suffix + suffix + modelConfig.midfill,
        options: {
            stop: modelConfig.stop,
            temperature: 0.2,
            num_predict: 100
        }
    }
}


export const processText = (document: vscode.TextDocument, position: vscode.Position): PreProcessedPrompt => {
    let prefix = document.getText().slice(0, document.offsetAt(position));
    let suffix = document.getText().slice(document.offsetAt(position));
    let languageConfig = getLanguageConfig(document.uri.fsPath);
    return getFormattedModalPrompt(
        prefix, suffix, languageConfig
    )
}
