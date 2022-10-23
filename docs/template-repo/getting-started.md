# Getting Started

Welcome to the getting started page! Here is all you need to know to get this repo up and running on your local machine, as well as good collaborative coding practices

## Contents

- [One time setup](#one-time-setup)
- [Setup for Tech Leads](#setup-for-tech-leads)
- [Every time setup](#every-time-setup)
- [How to make a Pull Request](#how-to-make-a-pull-request)
- [Helpful commands](#helpful-commands)

## One time setup

1. Clone this repository `git clone <repo-url>`
2. Run `npm i` at the root of the repository
3. TODO: Install Amplify
4. Install IDE Extensions
   - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
   - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
5. Enable format on save in your IDE
   1. Click the settings button in the bottom left  
      <img src="../images/vs-code-settings.png" alt="VSCode Settings 1" width="500"/>
   2. Search "formatter" and set your default formatter to Prettier
   3. Search "format on save" and click the checkbox
6. Enable the pre-commit hook by running `npx mrm@2 lint-staged` at the root of your repository

## Setup for Tech Leads

1. Review the [repo-features](./repo-features.md) document to understand what is included in this repository off the bat
2. Edit the "One time setup" section above as needed, then execute those steps
3. Follow the [amplify-setup](./amplify-setup.md) guide (assuming you are using Amplify for your backend) (TODO)
4. Turn on branch protections
   1. Visit your repo on [github.com](https://github.com)
   2. Click the Settings button on the top bar
   3. Click the branches tab on the left sidebar
   4. Click add rule
   5. Click "Require a pull request before merging"
   6. Create  
      <img src="../images/require-code-review.png" alt="Require Code Review" width="500"/>

## Every time setup

Every time you start a new feature/branch, you should run all of these commands. All commands should be executed on the root of your repo.

1. `git checkout main`
2. `git pull`
3. `amplify pull` (assuming you use amplify)
4. `npm i`
5. `git checkout -b <branch-name>`
6. `npm start`

## How to make a Pull Request

When interacting with Git/GitHub, feel free to use the command line, VSCode extension, or Github desktop. These steps assume you have already made a branch using `git checkout -b <branch-name>` and you have made all neccessary code changes for the provided task.

1. View diffs of each file before `git add <file-path>` with the VSCode Github extension (3rd icon on far left bar of VSCode) or GitHub Desktop
2. `git commit -m "<commit-message>"`
3. `git push`
4. Click notification to make Pull Request or visit your repo on [github.com](https://github.com/)
5. Include pull request title, breif description, and request reviewer
6. Wait to make sure CI (Github Actions) passes
7. Update your Kanban board!

## Helpful commands

- `npm start`: Boot up your frontend
- `npm run lint-check`: make sure Prettier and ESLint pass
- `npm run lint-fix`: make sure Prettier and ESLint pass and try to automatically fix all issues (some ESLint issues must be resolved manually)
- `git stash`: Temporarily remove all local changes to a branch and save them. Good when you need to hop to another branch without committing your current code.
- `git stash apply`: Reapply most recent git stash.
- `git merge orgin/main`: Pull all changes from the main branch to yours, good for resolving merge conflicts.

## Project Structure

- [**.github**](.github) Github Actions CI/CD
- [**.husky**](.husky) Linting pre-commit hook [Read More](https://prettier.io/docs/en/precommit.html)
- [**docs**](docs) Documentation
- [**public**](public) Assets for frontend [Read More](https://create-react-app.dev/docs/using-the-public-folder/)
- [**src**](src) Frontend code
