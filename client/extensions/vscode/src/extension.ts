import * as vscode from 'vscode';
import { CompletionProvider } from './providers/completionProvider';
import Config from "./core/config"

export function activate(context: vscode.ExtensionContext) {

	const provider = new CompletionProvider(context);
	let disposable = vscode.languages.registerInlineCompletionItemProvider(
		{ pattern: "**" },
		provider
	);
	context.subscriptions.push(disposable);
	
	let status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	status.command = 'openpilot.toggle';
	status.text = `$(ghost-icon)`;
	status.show();
	context.subscriptions.push(status);

	let toggle = vscode.commands.registerCommand('openpilot.toggle', () => {
		Config.setPaused(!Config.getPaused())
		vscode.window.showInformationMessage(`openpilot is now  ${Config.getPaused() ? "deactivated" : "activated"}`);
	});

	let reload = vscode.commands.registerCommand('openpilot.reload', () => {
		let loaded = Config.loadConfig();
		vscode.window.showInformationMessage(loaded ? 'openpilot successfully loaded' : 'something went wrong while loading openpilot');
	});

	context.subscriptions.push(toggle);
	context.subscriptions.push(reload);

	vscode.commands.executeCommand("openpilot.reload");
}

export function deactivate() {}
