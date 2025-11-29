// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

async function handleWolfpackChatRequest(request: any, context: any, stream: any, token: any) {
    //console.log('Received chat request:', request);
    const fetch = (await import('node-fetch')).default;
    const sessionId = vscode.env.machineId;
    const userMessage = request.prompt;
    try {
        // Use VS Code configuration for the API URL
        const apiUrl = vscode.workspace.getConfiguration().get<string>('wolfpackAiAssistant.apiUrl', 'http://localhost:9001/ask/wolfpack');
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: userMessage, session_id: sessionId })
        });
        const data = await response.json() as { result: unknown };
        // Send response to chat stream
        stream.markdown(
            typeof data.result === 'string' ? data.result : JSON.stringify(data.result)
        );
    } catch (err) {
        stream.markdown(
            'Error contacting Wolfpack AI Assistant: ' + (err instanceof Error ? err.message : String(err))
        );
    }
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Register chat participant (new API)
    if ((vscode as any).chat && typeof (vscode as any).chat.createChatParticipant === 'function') {
        console.log('Activating Woldfpack AI Assistant Chat extension...');
        const wolfpackParticipantDisposable = (vscode as any).chat.createChatParticipant(
            "Wolfpack-vscode.chat", // Must match id in package.json
            handleWolfpackChatRequest
        );
        context.subscriptions.push(wolfpackParticipantDisposable);
    }
}

export function deactivate() {}
