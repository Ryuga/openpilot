import vscode from 'vscode';
import { OllamaClient } from '../utils/promptGenerator';
import { processText } from '../utils/preProcessor';
let ollamaClient = new OllamaClient(
    "http://127.0.0.1:11434"
);

export class CompletionProvider implements vscode.InlineCompletionItemProvider {
    context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {
        this.context = context
    }

    async provideInlineCompletionItems(
         document: vscode.TextDocument,
        position: vscode.Position,
        context: vscode.InlineCompletionContext,
        token: vscode.CancellationToken
    ): Promise<vscode.InlineCompletionItem[] | vscode.InlineCompletionList | undefined | null> {
        let buffer = "";
        let data = processText(document, position);
        for await(let token of ollamaClient.readStream("/api/generate", data)){
            buffer += JSON.parse(token).response;
        }
        return [ 
            {
                insertText: buffer,
                range: new vscode.Range(
                    position, position
                )
            },
        ];
    }
}