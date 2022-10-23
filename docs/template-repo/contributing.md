### Making Changes
1. Before you start making changes, always ```git pull``` and then ```npm i``` to make sure your code is up to date 
2. Create a branch ```git checkout -b <name-of-branch>```
3. Make changes to the code 
4. ```npm run lint``` to ensure code standards. (running ```npm run lint-fix``` will fix most of the styling errors)

### Commiting Changes
1. ```git add .``` (to stage all files) or ```git add <file-name>``` (to stage specific file)
2. ```git commit -m "<type>[optional scope]: <description>"``` or
   ```git commit -m "<type>[optional scope]: <description>" -m "[optional body]"``` or
   ```git commit``` to get a message prompt
3. ```git push -u origin <name-of-branch>```

### Making Pull Requests
1. Go to the Pull Requests tab
2. Find your PR, fill out the PR template
3. (If applicable, provide a screenshot of your work in the comment area)
4. Link your PR to the corresponding **Issue**  
5. Request a reviewer to check your code
6. Once approved, your code is ready to be merged in 🎉