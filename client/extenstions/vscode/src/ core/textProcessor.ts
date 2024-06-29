import vscode from 'vscode';

export interface textProcessor {
    processText(document: vscode.TextDocument, position: vscode.Position):any// vscode.InlineCompletionItem | string;
}

