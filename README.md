### Global dependencies

- python3
- pip3
- virtualenv

#### Creating virtualenv

```

$ virtualenv -p python3 <ENV_NAME>
$ source <ENV_NAME>/bin/activate
```

#### Installing project dependencies

```

$ <ENV_NAME>/bin/pip3 install -r requirements.txt
```

#### Installing new packages

```

$ <ENV_NAME>/bin/pip3 install <PACKAGE_NAME>
$ <ENV_NAME>/bin/pip3 freeze > requirements.txt
```
