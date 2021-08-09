## Environment Variables
Being able to set variables in your local machine or server instead of putting it in your code is much safer when security is of concern, especially if you are using api keys (others can steal your key--which is supposed to be kept confidential--if it's exposed on github). You can temporarily set variables by doing the following:
```
// Linux and MacOS
export API_KEY=...

// Windows CMD
set API_KEY="..."

// Windows PowerShell
$env:API_KEY="..."
```
These variables will exist until you close/restart your terminal.

---

> NOTE: This demo express app will run on http://localhost:3000 by default.

# Express using express-generator
This project structure was generated using the `express` npm package. You are able to install it using `npm i -g express` and make an express app using `express --view=hbs <app_name>`. 

### Enable Server Reload
The package `nodemon` will help you reload your server automatically when you make changes to your server (code, new files, etc.). Install `nodemon` (`npm i --save-dev nodemon`) and change your package.json `start` script to `nodemon ./bin/www`.

**Start your server using `npm start`**.

## express-generator Project Structure
 - `/bin` includes the `www` script that will start the express server.
 - `app.js` is where you are able to configure your express app with global middleware and more routes
 - `/routes` includes the js files (routers) that define your sub-routes beyond what's defined on `app.js`. For instance, defining a handler for '/info' on `users.js` (which is defined as '/users' on `app.js`) will mean that the handler is accessed on '/users/info'. They commonly render template views for the client.
 - `/views` includes all the template files that define the page. Think of it as fancy HTML, which supports the ability to accept variables passed from the backend js (`/routes`). This project uses templating from handlebars.js.
 - `/public` includes all of the "static" files of your project, meaning that the contents will NOT change at any time that the server is running. These files include client js files (attached to the html templates) and css styling. *NOTE: all files in this folder will be served at root (`/`) of the server.*

## Routers
You can split your express app into multiple components with routers. For example, instead of handling the `/login` and `/product` route of a website in one index.js file, you can dedicate a router for each route, and define further sub-routes (`/product/:id`) in each router.
