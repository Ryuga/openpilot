# OpenPilot — Local AI Code Completion for VS Code

A VS Code extension that provides low-latency, privacy-preserving code completion using **locally hosted LLMs**. All inference runs on your machine via Ollama with no external API calls or source code leakage.

## Overview

OpenPilot delivers inline AI code suggestions directly inside VS Code by connecting to locally running language models. It uses editor context to shape prompts and generate relevant completions with minimal latency.

## Features

- Local LLM-powered inline code completion
- No external API calls
- Source code stays on your machine
- Ollama-based model serving
- Context-aware prompt shaping from editor buffer
- Lightweight request pipeline for fast responses
- Works offline after model setup
- Model-agnostic (supports multiple Ollama models)

## Stack

- VS Code Extension API
- Node.js
- Ollama local model runtime

## Supported Models

Tested with:

- Code Llama
- StableCode

Any Ollama-compatible code model can be configured.

## Requirements

- VS Code (latest stable)
- Node.js 18+
- Ollama installed and running
- At least one local model pulled

## Maintenance Note

As of May 20 2025 this project is irrelevent because of what transpired.

