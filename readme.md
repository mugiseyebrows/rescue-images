# About

You find yourself in situation when you have html page loaded in browser with images that are no longer accessable. They're gone, completely and irreversibly. You cannot get them back. You sit in dim light, filled with regret and sadness. You try to save page. It doesn't work - browser tries to fetch them using srcs. Don't be sad, you can get them back - they still live in cache of your browser. 

# Usage

Install dependancies and run server.

```bash
npm i
node index.js
```

Open developer tools in browser (F12) and paste `browser.js` into javascript console. If browser asks you to permit code paste, do that. Wait until `done` message.

You can terminate server now with `CTRL-C`.

Open `data` folder and enjoy your images.

In case you see errors: you need to disable proxying in browser settings, at least for localhost.

# How it works

Script in browser takes loaded images and draws them onto canvas, then sends them as dataUri within json payload as CORS POST requests to http server running on localhost. Server decodes them to blob and saves into `data` folder.