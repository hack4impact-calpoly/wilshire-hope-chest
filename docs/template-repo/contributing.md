# Contributing

Here are all of the steps you should follow whenever contributing to this repo!

## Making Changes

1. Before you start making changes, always make sure you're on the dev branch, then `git pull`, `npm i`, and `amplify pull` to make sure your code is up to date
2. Create a branch `git checkout -b <name-of-branch>`
3. Make changes to the code
   - Any changes to Amplify must be done in the "staging" environment
4. `npm run lint` to ensure code standards. (running `npm run lint-fix` will fix most of the styling errors)

## Commiting Changes

When interacting with Git/GitHub, feel free to use the command line, VSCode extension, or Github desktop. These steps assume you have already made a branch using `git checkout -b <branch-name>` and you have made all neccessary code changes for the provided task.

1. View diffs of each file you changed using the VSCode Github extension (3rd icon on far left bar of VSCode) or GitHub Desktop
2. `git add .` (to stage all files) or `git add <file-name>` (to stage specific file)
3. `git commit -m "<type>[optional scope]: <description>"` or
   `git commit -m "<type>[optional scope]: <description>" -m "[optional body]"` or
   `git commit` to get a message prompt
4. `git push -u origin <name-of-branch>`
5. `amplify push`

## Making Pull Requests

1. Go to the Pull Requests tab on [github.com](https://github.com/)
2. Find your PR, fill out the PR template
3. (If applicable, provide a screenshot of your work in the comment area)
4. Link your PR to the corresponding **Issue**  
5. Request a reviewer to check your code
6. Once approved, your code is ready to be merged in 🎉

## Deploying

1. Run `amplify pull` when in the Amplify staging environment
2. Run `amplify env checkout prod` to switch to the production environment
3. Run `amplify push` to commit changes to production
4. Merge source branch into main branch
5. This will execute the deployment process in AWS. Wait for it to finish then view the link given.