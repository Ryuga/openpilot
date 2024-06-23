import vscode from 'vscode';

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
        return [
            {
                insertText: "Test 123 12313",
                range: new vscode.Range(
                    position, position
                )
            },
            {
                insertText: "Test 123 44444",
                range: new vscode.Range(
                    position, position
                )
            },
        ];
    }
}