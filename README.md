# mylib-test-task

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Build the Docker image
```
docker build -t vuejs/dockerize-mylib-test .
```

### Run Vue.js app in a Docker container
```
docker run -it -p 8080:8080 --rm --name dockerize-mylib-test-1 vuejs/dockerize-mylib-test
```