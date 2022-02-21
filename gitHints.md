Rename the local branch from `master` to `main` to match github:

```
$ git branch --move master main
```

Connect the remote:

```
$ git remote add origin git@github.com:thedivloop/expressJS-tutorial.git
```

Push to origin main for the first time:

```
$ git push --set-upstream origin main
```

Force the rewrite when pushing in case an issue was face, however particular care must but taken as this overwrites whatever is in the remote branch ([link](https://stackoverflow.com/questions/24357108/updates-were-rejected-because-the-remote-contains-work-that-you-do-not-have-loca)):

```
$ git branch --move master main
```
