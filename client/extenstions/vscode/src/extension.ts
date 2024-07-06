import * as vscode from 'vscode';
import { CompletionProvider } from './providers/completionProvider';

export function activate(context: vscode.ExtensionContext) {

	const provider = new CompletionProvider(context);
	let disposable = vscode.languages.registerInlineCompletionItemProvider(
		{ pattern: "**" },
		provider
	);
	context.subscriptions.push(disposable);
	  
	console.log('Congratulations, your extension "openpilot" is now active!');

	const dispose = vscode.commands.registerCommand('openpilot.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from openpilot!');
	});

	context.subscriptions.push(dispose);
}

export function deactivate() {}
