# Knowledgexpert README

The purpose of this project is to provide a Visual Studio Code Copilot chat extension that enhances productivity by offering advice on how to implement a Knowledgenet rules application and how to develop rules.

Knowledgenet is a Python-based rules engine designed to help developers and business users automate complex decision-making. At its core, Knowledgenet uses an adaptation of the RETE algorithm—an efficient, explainable pattern-matching algorithm widely used in expert systems and AI. The engine processes input facts and applies user-authored rules to derive new facts or decisions, supporting both forward and backward chaining. Knowledgenet is ideal for applications where business logic is complex, evolving, and requires transparency, such as compliance, eligibility, or workflow automation. Rules can be authored in Python and organized into rulesets and repositories, making the system flexible and maintainable as requirements grow.


## Requirements
1. Visual Studio Code (version 1.85.0 or later).
1. Github Copilot extension installed.
1. Github Copilot Chat installed.
1. Extension(s) for Python development environment installed.
1. Knowledgexpert backend API service running.

## Extension Settings
This extension contributes the following VS Code setting:

* `knowledgexpertAiAssistant.apiUrl`: The URL of the knowledgexpert AI Assistant backend API. You can change this to point to your own backend service if needed. Default: `http://localhost:9000/ask`

## Development
1. Install nodejs-npm - Use the operating system's installer like dnf, yum, apt, etc.
1. Install Yeoman and generator-code:
    ```bash
    sudo npm install -g yo generator-code
    ```
1. Clone this project.
    ```bash
    cd $GIT_HOME
    git clone git@github.com:amitchatterjee/knowledgexpert-vscode.git
    ```
1. Install additional packages:
    ```bash
    cd $GIT_HOME/knowledgexpert-vscode
    npm install node-fetch
    ```
1. Compile the project.
    ```bash
    cd $GIT_HOME/knowledgexpert-vscode
    npm run compile
    ```
1. Launch the extension from Visual Code by executing src/extension.ts (F5) 

Note: Create a vscode extension scaffolding. This is how this project archetype was created:
```bash
cd $GIT_HOME/
yo code
```

## Known Issues
I am sure there are quite a few.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.
---
