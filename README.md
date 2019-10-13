# sudo-wudo

> Repository for CS 4500 `sudo-wudo` team

This is the repository for all of the work created by the `sudo-wudo` team in the CS 4500 Software Development course, section 3.

## Table of Contents

- [Getting Started](#-getting-started)
- [Development Workflow](#-development-workflow)

## 🚀 Getting Started

### Pre-requisites

- [Node](https://nodejs.org/en/)

- [NPM](https://www.npmjs.com/)

### Installation

1. Ensure NVM is installed globally.

   We are using NVM (Node Version Manager) to maintain the same Node version that's running on the Linux machines.

   To install NVM, follow the steps provided [here](https://github.com/nvm-sh/nvm/blob/master/README.md#installation-and-update).

2. Run `nvm install` to ensure you're using the correct version of Node

3. Run `npm install` for dev dependencies

4. Run `npm run bootstrap` for package dependencies

5. Run `npm run hook:install` to install Git pre-commit hook

## 🛠 Development Workflow

1. Run `nvm use` to ensure you're using the correct version of Node

2. Start coding!

## ‍🙅‍ Code Quality

Don't commit messy code!

Here's a list of things already configured to keep you in line:

- [EditorConfig](https://editorconfig.org/)
- [Upstatement's ESLint Config](https://github.com/Upstatement/eslint-config)
- [Upstatement's Prettier Config](https://github.com/Upstatement/prettier-config)

All of these tools will be run with the pre-commit hook (configured with [Husky](https://github.com/typicode/husky)) to make sure you're not committing inconsistent code. We highly recommend configuring your editor to use these tools so that you can see (and fix) style violations as you write code.
