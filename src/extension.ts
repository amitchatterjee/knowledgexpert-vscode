// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Request handler for chat participant
async function handleChatRequest(request: any, context: any, stream: any, token: any) {
    //console.log('Received chat request:', request);
    const fetch = (await import('node-fetch')).default;
    const sessionId = vscode.env.machineId;
    const userMessage = request.prompt;
    try {
        // Use VS Code configuration for the API URL
        const apiUrl = vscode.workspace.getConfiguration().get<string>('knowledgenetAiAssistant.apiUrl', 'http://localhost:9000/ask');
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
            'Error contacting Knowledgenet AI Assistant: ' + (err instanceof Error ? err.message : String(err))
        );
    }
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Register chat participant (new API)
    if ((vscode as any).chat && typeof (vscode as any).chat.createChatParticipant === 'function') {
        console.log('Activating Knowledgenet AI Assistant Chat extension...');
        const participantDisposable = (vscode as any).chat.createChatParticipant(
            'knowledgenet-ai-assistant.chat', // Must match id in package.json
            handleChatRequest
        );
        context.subscriptions.push(participantDisposable);
    }
}

export function deactivate() {}
