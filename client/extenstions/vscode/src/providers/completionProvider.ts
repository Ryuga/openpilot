import vscode from 'vscode';
import { OllamaClient } from '../utils/promptGenerator';
import { processText } from '../utils/preProcessor';
let lc = new OllamaClient(
    "http://127.0.0.1:11434",
    "stream"
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
        for await(let token of lc.readStream("/api/generate", data)){
            buffer += token;
        }
        console.log("Buffer: ", buffer, "Returning");
        console.log(position)
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