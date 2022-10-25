# Getting Started

Welcome to the getting started page! Here is all you need to know to get this repo up and running on your local machine, as well as good collaborative coding practices

## Contents

- [Setup for All Developers](#setup-for-all-developers)
- [Setup for Tech Leads](#setup-for-tech-leads)
- [Helpful commands](#helpful-commands)
- [Project Structure](#project-structure)

## Setup for all Developers

1. Clone this repository `git clone <repo-url>`
2. Run `npm i` at the root of the repository
3. TODO: Setup backend
4. Install IDE Extensions
   - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
   - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
5. Enable format on save in your IDE
   1. Click the settings button in the bottom left  
      <img src="../images/vs-code-settings.png" alt="VSCode Settings 1" width="500"/>
   2. Search "formatter" and set your default formatter to Prettier
   3. Search "format on save" and click the checkbox
6. Enable the pre-commit hook by running `npx mrm@2 lint-staged` at the root of your repository
7. Familiarize yourself with [Helpful Commands](#helpful-commands), the [Project Structure](#project-structure), and the [steps for contributing](./contributing.md)

## Setup for Tech Leads

1. Review the [repo-features](./repo-features.md) document to understand what is included in this repository off the bat
2. Set up the backend for your team
3. Edit the "One time setup" section above as needed, then execute those steps
4. Turn on branch protections
   1. Visit your repo on [github.com](https://github.com)
   2. Click the Settings button on the top bar
   3. Click the branches tab on the left sidebar
   4. Click add rule
   5. Click "Require a pull request before merging"
   6. Create  
      <img src="../images/require-code-review.png" alt="Require Code Review" width="500"/>

## Helpful commands

- `npm start`: Boot up your frontend
- `npm run lint-check`: make sure Prettier and ESLint pass
- `npm run lint-fix`: make sure Prettier and ESLint pass and try to automatically fix all issues (some ESLint issues must be resolved manually)
- `git stash`: Temporarily remove all local changes to a branch and save them. Good when you need to hop to another branch without committing your current code.
- `git stash apply`: Reapply most recent git stash.
- `git merge orgin/main`: Pull all changes from the main branch to yours, good for resolving merge conflicts.

## Project Structure

- [**.github**](/.github) Github Actions CI/CD and Issue/PR templates
- [**.husky**](/.husky) Linting pre-commit hook [Read More](https://prettier.io/docs/en/precommit.html)
- [**docs**](/docs) Documentation
      - [**images**](/docs/images/) Images used for documentation
      - [**template-repo**](/docs/template-repo/) Documentation that came with the template repository
- [**public**](/public) Assets for frontend [Read More](https://create-react-app.dev/docs/using-the-public-folder/)
- [**src**](/src) Frontend code
      - [**tests**](/src/tests/) Tests for the frontend
      - [**components**](/src/components/) React components
      - [App.tsx](/src/App.tsx) Top level React component, where most routing goes
      - [App.css](/src/App.css) Top level CSS, where all global CSS rules go
