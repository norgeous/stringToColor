# demo1

## environment setup

get nodejs with chocolatey
```
choco install nodejs
```
install jspm and a server
```
npm install -g jspm
npm install -g jspm-server
```
verify npm installation
```
npm ls -g --depth=0
```

## project setup

get the dependencies listed in ```package.json```
```
jspm install
```

to get ```index-dev.html``` working run
```
jspm-server
```
and go to http://127.0.0.1:8080/index-dev.html

the webpage will live reload as you modify the code.


to rebundle the js that ```index-sfx.html``` uses, run
```
jspm bundle-sfx lib/main build-sfx.js --minify
```
this bundles all dependencies into one sfx file
