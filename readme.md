# Interstellar

A professional command-line interface for managing distributed nodes and user accounts on the Bits Engine platform.

## Overview

Interstellar is a comprehensive CLI application designed for users who need to create and manage accounts, administer nodes, and interact seamlessly with the Bits Engine backend service. The tool provides robust authentication mechanisms, intuitive node management capabilities, and automatic machine identification features.

**Version:** 1.0.0  
**Code Name:** Nebula  
**Release Date:** April 5, 2026  
**Author:** Bits

## Key Features

- **Account Management** — Create new user accounts, sign in securely, retrieve user information, and switch between machines
- **Node Management** — Create, list, update, and delete nodes associated with your account
- **Server Keep-Alive Pinging** — Automatically ping your server URLs to keep them active and prevent sleep states. Ideal for users on free hosting plans that impose inactive server timeouts, ensuring consistent performance and eliminating slow response times
- **Machine Identification** — Automatic machine ID generation for secure device tracking
- **Secure Authentication** — Token-based authentication with local signing key storage

## Installation

Install Interstellar globally via npm:

```
npm install -g interstellar
```

## Command Reference

### General Commands

**`--help` or `-h`**  
Display comprehensive help information and command reference.

**`--version` or `-v`**  
Display the current version number of Interstellar.

### Account Commands

**`--createAccount <username> <passcode>`**  
Create a new account with a unique username and secure passcode. This generates a signing key stored locally for future authentication.

**`--signin <username> <passcode>`**  
Sign in to your existing account using your username and passcode. Required before accessing node management features.

**`--myInfo`**  
Retrieve and display detailed information about your current account, including account creation date and associated machines.

**`--changeMachine <username> <passcode>`**  
Authenticate your current machine with an existing account. Use this when switching to a new computer or device while maintaining account continuity.

### Node Management Commands

**`--createNode <nodeName> <nodeUrl>`**  
Create a new node with a specified name and URL. Each node serves as an endpoint within your distributed network.

**`--listNode`**  
Display a complete list of all nodes associated with your account, including their names, URLs, and status information.

**`--deleteNode <nodeName>`**  
Remove a node from your account. This action is permanent and cannot be undone.

**`--updateNodeName <oldNodeName> <newNodeName>`**  
Rename an existing node. Useful for organizing and maintaining clear naming conventions across your infrastructure.

**`--updateNodeUrl <nodeName> <newNodeUrl>`**  
Update the URL or endpoint address for an existing node. Changes take effect immediately.

## How It Works

When you create an account with Interstellar, the system generates a unique machine identifier based on your hardware specifications and stores an authentication token locally. This token enables you to authenticate subsequent requests without re-entering credentials. The machine identifier ensures that your account is secure and tied to specific devices.

Node management operates through a straightforward workflow: create nodes with distinct names and URLs, list your nodes to verify configurations, and update or remove nodes as your infrastructure evolves. Each node operation is tracked and synced with the Bits Engine backend in real-time.

**Server Keep-Alive System** — One of Interstellar's most valuable features is its ability to keep your servers alive and responsive. If you're using free hosting plans from platforms like Heroku, Render, Railway, or similar services, these providers often put inactive servers into a sleep state after a period of inactivity. This results in slow response times when the server needs to wake up. Interstellar automatically pings your server URLs at regular intervals, maintaining continuous activity and preventing sleep states. This ensures your applications remain fast and responsive without requiring a paid tier upgrade. Simply add your server URLs as nodes, and Interstellar handles the rest.

Machine switching allows you to use the same account across multiple devices. When you switch to a new machine, simply authenticate with your existing credentials, and the system registers the new device to your account.

## Support & Contact

For technical support, questions, or feedback, please reach out to us at **chuksisonchain@gmail.com**

## License

ISC
