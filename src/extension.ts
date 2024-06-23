// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { CompletionProvider } from './providers/completionProvider';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const provider = new CompletionProvider(context);
	let disposable = vscode.languages.registerInlineCompletionItemProvider(
		{ pattern: "**" },
		provider
	);
	context.subscriptions.push(disposable);
	  
	console.log('Congratulations, your extension "openpilot" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const dispose = vscode.commands.registerCommand('openpilot.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from openpilot!');
	});

	context.subscriptions.push(dispose);
}

// This method is called when your extension is deactivated
export function deactivate() {}
