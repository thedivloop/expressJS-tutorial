# Express JS tutorial

This document describes the basics of setting up [ExpressJS](https://expressjs.com).

---

## Audience

This document is targeted to beginners and newbies, however javascript language understanding and some little experience is a must to be able to follow.

---

## Prerequisites

Although this exercise is for beginners and newbies in [ExpressJS](https://expressjs.com) some notions and resources are still required.

1. Text editor or IDE: [vi](https://en.wikipedia.org/wiki/Vi), [vim](<https://en.wikipedia.org/wiki/Vim_(text_editor)>), [nano](https://en.wikipedia.org/wiki/GNU_nano), [Atom](https://atom.io), [Sublime](https://www.sublimetext.com), [VSC](https://code.visualstudio.com). The recommended one is [VSC](https://code.visualstudio.com) made by Microsoft very complete and free of course. [Atom](https://atom.io), [Sublime](https://www.sublimetext.com) are very good light text editors for programmers. [vi](https://en.wikipedia.org/wiki/Vi), [vim](<https://en.wikipedia.org/wiki/Vim_(text_editor)>), [nano](https://en.wikipedia.org/wiki/GNU_nano) are for more hardcore people, I guess if you are reading this you might not be familiar with those.
2. Understand javascript, beginner level can be sufficient, but [ES6 (ECMA Script 2015)](http://es6-features.org/#Constants) is a real plus
3. [`NodeJS`](https://nodejs.org/en/) installed
4. [`npm`](https://www.npmjs.com) or [`yarn`](https://yarnpkg.com) package manager installed. This exercise will however be using `npm`.
5. Know the basics of [shell commands](https://swcarpentry.github.io/shell-novice/reference.html) and terminal operations. It can be slightly different between UNIX(also used by MacOS), Microsoft command line and Powershell(also on Microsoft Windows), but it is basically equivalent.
6. Operate an HTTP client like [Postman](https://www.postman.com), no support for Postman is given here but their documentation is very good. GET requests can be tested directly on the browser though.

---

## Objectives

At the end of this exercise the reader will be able to:

1. Setup an [ExpressJS](https://expressjs.com) webserver
2. Define routes
3. Understand and apply different request types (GET, POST, PUT, DELETE)
4. Set and retrieve path parameters and payloads
5. Return a response to the client

---

## Writing conventions

### Shell commands

Any shell command will be specified with a `$` prefix. However, you shall not type it, only the following text/command.

### Code

Whenever additional code is added the code pre-existing in the file is represented by `...` so that attention is put on the newly added code.

---

## Preparation

### Folder

Create your working/project folder.

```
$ mkdir myProjectFolder
$ cd myProjectFolder
$ mkdir server
$ mkdir client
```

### NPM initialization

NPM Initialization is required to create our [`package.json`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json) file. That file represents a json object containing information about our project, including scripts, dependencies and more.

Make sure you are inside the server folder before initializing.

```
$ cd server
$ npm init
```

You will be several questions related to the project, you can just key in `enter` until all is answered, or type in different information.

Optionally you can skip the questions by typing the following instead:

```
$ cd server
$ npm init -y
```

The default `package.json` file looks like this:

_package.json_

```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

More information here:

- [`npm init`](https://docs.npmjs.com/cli/v7/commands/npm-init)
- [`package.json`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)

### Packages installation

Obviously to run [ExpressJS](https://expressjs.com) we have to install the related package as follows:

```
$ npm install express
```

We can see on the terminal the result of the successful installation

```
added 50 packages, and audited 51 packages in 3s

2 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

In our `server` folder we now have an additional folder named `node_modules`.
In those modules we have of course the [ExpressJS](https://expressjs.com) package but also all the default packages of [`NodeJS`](https://nodejs.org/en/).

In addition our `package.json` has been updated with `dependencies`:

_package.json_

```json
...
"dependencies": {
    "express": "^4.17.3"
  }
...
```

### Entry point

The entry point is the file our server will be running, in our case `index.js` as stated in the property `main` of our `package.json`.

Make sure you are still in the `server` folder.

Let's go ahead and create our file:

```
$ touch index.js
```

Our system is now ready to receive its first lines of code!

---

## First steps code

Now things are getting serious as we are moving on to the coding part.

### Our first code in `index.js`

First we need to import our `express` module. Here we are using the builtin function to include modules that exist in separate files. We could use the `ES6` `import` method as well but that is not covered here. If you want to read more about it check [this](https://www.geeksforgeeks.org/difference-between-node-js-require-and-es6-import-and-export/) out.

_index.js_

```js
const express = require("express");
```

Then we can initialize an `express` application instance named `app`:

_index.js_

```js
...
const app = express();
```

Now that our `server` has an `express` application set we need to make sure the server can listen to our requests.

_index.js_

```js
...
app.listen(3001, function () {
  console.log("Server running on port 3001");
});
```

So `listen` is a method of `app`. In its simplest form it takes 2 arguments, a `port` number and a `callback function`. In this example that function writes out to the console the message `Server running on port 3001`.
From now on we will be using the `ES6` `arrow` function standard as follows but it has exactly the same meaning:

_index.js_

```js
...
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
```

### Test our first index.js

Now in just few lines of cose we have a webserver!! Isn't it amazing? Literally 3 lines of code, difficult to do shorter...

Time to test that. Let's go ahead and run it from the command line (`shell`) and from inside the `server` folder. To do that is very simple we just need to run `node` with the filename `index.js` as an argument:

```
$ node index.js
```

If everything goes well, on our terminal we can see the result of the `console.log`:

```
$ Server running on port 3001
```

Well that's an achievement but we are not expecting a webserver just gives a console message, right?

Fine! So what can we do?
Easy... Open your browser and go to `http://localhost:3001`.

What did you get on your browser page?

`Cannot GET /` ?

Well if this is what you got, than it means our server is up and running!! Is just that we haven't set what wa want to serve yet.
By serve we mean `return`.

Ok let's cool down because we just have invested a massive effort get this great achievement so let's stop our server for now by pressing `CTRL+C` and get back to our `shell prompt`.

But just before we take some rest, we want to have something that gives us a better result than `Cannot GET /`!

For that we need to tell our server what to return if we go on the root route, in this case `http://localhost:3001`. To do so we add this code to our `index.js` file:

_index.js_

```js
...
app.get("/", (req, res) => {
  res.send("It is working!!");
});
```

`get` is another method of our `app`. It provides a way to specify what is returned or served for every `route` when a `GET HTTP request` is received.
The first argument is `'/'` representing the root. The second argument is a callback function taking 2 object arguments `req` and `res` representing the `HTTP request` and the `HTTP response` respectively.
`req` is useful to collect information related to the request and `res` alows us to return to the requester a response with whatever we want in it.

In this example, we are sending back the message `It is working`.

Let's run our server again:

```
$ node index.js
```

And let's go back to our browser on `http://localhost:3001`.

Aaaaaahhhhhh!!! There you go! Now you can see something more reassuring, as you should see on your browser:

`It is working!!`

Alright let's contemplate our beautiful `index.js` code where we moved the `listen` part to the bottom by convention:

_index.js_

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("It is working!!");
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
```

### GET HTTP request

For the beginners and newbies HTTP requests might look a bit confusing. A typical question is why can I do a GET request from my browser and not a POST request?

Well simply because when you browse and go to websites by typing their address into your browser the way it works is that your browser makes a `GET HTTP request` to the domain you are requesting. Let's say you go onto [`https://google.com`](https://google.com).

[`https://google.com`](https://google.com) will receive a `GET HTTP request` from your browser. Their webserver will go on the root route (since there is nothing after '.com') and will check what has to be served when a get request is received on the root URI. As seen above the root is simply represented by `'/'` in `express` like in many other languages and frameworks.

Form your browser url field you cannot send any other `HTTP request` than `GET`. For that you either need to code it or to use a client like [Postman](https://www.postman.com) or you can also use browser extensions [Chrome RestMan](https://chrome.google.com/webstore/detail/restman/ihgpcfpkpmdcghlnaofdmjkoemnlijdi) or browsers developer tools and features.
Last but not least [`curl`](https://en.wikipedia.org/wiki/CURL) is a command line tool that also helps if you are not affraid of more complex `shell` commands.

If you kept reading, then I will give you an example of use of [`curl`](https://en.wikipedia.org/wiki/CURL).
After you started your server as seen above you can go on to a different terminal window and type:

```
$ curl localhost:3001
```

You should see the result on your terminal:

```
$ It is working!!
```

### Return proper data

After the previous part and understanding the basics of an `express app` setup, let's make sure what we do has some additional meaningful use.

First let's make sure we can receive `json` data from the client. In fact, most of the times a server is receiving from and returning to the client a JSON object.

To do so we need to set out some `middleware`. That is a big word but simply means our `express app` will be using some code or configuration when running. Middleware is set up using the `use` method on our `app`.

_index.js_

```js
...
app.use(express.json());
```

`use` takes an argument of `express.json()` here.

This is particularly useful when receiving payloads from the client with `POST`, `PUT` and `DELETE HTTP requests`.

Now our server can receive `json` objects in the payload of an `HTTP request`.

Before that let's first `respond` with a `json` object instead of our `"It is working!!"` message.

To do so we will create a new route on a `GET HTTP request` named `/list`. The full `url` will therefore be `http://localhost:3001/list`.

_index.js_

```js
...
app.get("/list", (req, res) => {
  res.json({ name: "Michael", lastName: "Knight" });
});
...
```

As you can see `'/'` has been replaced by `'/list'` and the code in the callback function is now `res.json()` instead of `res.send()`. `res.json()` returns a `json` object whereas `res.send()` returns text.

### POST request

Time to complicate a bit. Let's create a `POST HTTP request` route. The route is `/add`.

First we will have to use the `post()` method instead of `get()` method on the `app` instance. Second since we are supposed to receive a payload we will have to process it and for the exercise we will first print it to the console.

_index.js_

```js
...
app.post("/add", (req, res) => {
  console.log(req.body);
});
...
```

`req.body` gives us access to the payload of the `POST HTTP request`, which in our case will be a `json` object.

Now to create the `POST HTTP request` you can use any of the options above, but to make it simple I will share here the `curl` command example.
Type the following in your terminal:

```
$ curl -X POST -H "Content-Type: application/json" -d '{"name": "Max", "lastName": "Verstappen"}' http://localhost:3001/add
```

Some explanation is required here.

`-X POST` sets the `HTTP request` type to `POST`.

`-H "Content-Type: application/json"` defines the format of the payload to `json`.

`-d '{"name": "Max", "lastName": "Verstappen"}'` is the payload, specified by `-d`.

`http://localhost:3001/add` is the `url` for the route `/add`.

On the server terminal we can see:

```
Server running on port 3001
{ name: 'Max', lastName: 'Verstappen' }
```

### PUT request

A `PUT HTTP request` is usually used to make updates on data available on the server or on the database.

Like `post` a `PUT HTTP request` also takes a payload and uses the `put` as the method on the `app` and for the example we kept the same callback function to output to the console the payload.

_index.js_

```js
...
app.put("/update", (req, res) => {
  console.log(req.body);
});
...
```

As we used the route `/update` we had to adapt our `HTTP request`:

```
$ curl -X PUT -H "Content-Type: application/json" -d '{"name": "Michael", "lastName": "Schumacher"}' http://localhost:3001/update
```

### DELETE request

You are now getting used to it, `DELETE HTTP request` just works the same way.
_index.js_

```js
...
app.delete("/delete", (req, res) => {
  console.log(req.body);
});
...
```

As we used the route `/delete` we had to adapt our `HTTP request`:

```
$ curl -X DELETE -H "Content-Type: application/json" -d '{"name": "Felipe", "lastName": "Massa"}' http://localhost:3001/delete
```

---

## Code organisation

We have got a server up and running and we somehow can communicate with it through the browser or HTTP client like `curl`.

Before going further let's get our code organised and cleaned up.

### Environment variables

You probably already heard about clean code and the fact that nothing should be hardcoded. Unfortunately we still have few things which are hard coded in our `index.js`:

_index.js_

```js
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("It is working!!");
});

app.get("/list", (req, res) => {
  res.json({ name: "Michael", lastName: "Knight" });
});

app.post("/add", (req, res) => {
  console.log(req.body);
});

app.put("/update", (req, res) => {
  console.log(req.body);
});

app.delete("/delete", (req, res) => {
  console.log(req.body);
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
```

The one thing we see right away is obviously the magic number 3001.
Even worse it is in 2 places!!! Definitely not following `DRY`. (Don't repeat yourself). The `port` should indeed be in a variable.
And in this case that should be an environment variable. What must understood is that the port is only used in `development` environment.

So to handle environment variables we can use a `node` package called `dotenv`.

Let's go ahead and install `dotenv` (from the server folder):

```
$ npm install dotenv
```

Our `package.json` gets immediately updated.

_package.json_

```json
...
"dependencies": {
    "dotenv": "^16.0.0",
    "express": "^4.17.3"
  },
...
```

The way `dotenv` works is simple. We create a `.env` file.

```
$ touch .env
```

Then whatever variables are listed in the file will be accessed in our `index.js` file using `process.env.VARIABLE_NAME`.

Let's list 1 variables in our `.env` file:

_.env_

```
PORT = 3001
NODE_ENV = development
```

`NODE_ENV` can be used later if we want to deploy our app in production.

As explained previously these 2 variables will be accessed through `process.env.PORT` and `process.env.NODE_ENV` respectively.

However, to access the variables in the `javascript` file `index.js`, `dotenv` needs to be _imported_ and set with the method `config()`.

_index.js_

```js
...
const dotenv = require('dotenv').config();
...
```

Time to put the variables in our `index.js`:

_index.js_

```js
const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("It is working!!");
});

...

app.listen(port, () => {
  console.log(`Server running on port ${port} `);
});
```

Just in case the environment variable is missing we added a `|| 3001` for development purposes.

### Development techniques

You have seen that every time we update our `index.js` file we need to exit the process using `CTRL+C` and launch again the app using `node index.js`. Obviously this is not very convenient.

So we will be using a package that will continuously rerun `index.js` anytime the file is updated. That package is called `nodemon`. Let's go ahead and install it. However, this package is only required for development so we have to install it as a development dependency using the option `-D`.

```
$ npm install -D nodemon
```

`Package.json` is now updated with this new dependency:

_package.json_

```json
...
"devDependencies": {
    "nodemon": "^2.0.15"
  }
...
```

Now that we have `nodemon` installed we can update our `scripts` in `package.json` as follows:

_package.json_

```json
...
"scripts": {
    "dev": "nodemon index.js"
}
...
```

It is very simple to launch our `dev` script, we simply type this in our terminal:

```
$ npm run dev
```

and we will see the result in the terminal:

```
> server@1.0.0 dev
> nodemon index.js

[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js`
Server running on port 3001
```

As you can understand from `nodemon` messages in the terminal, it is now watching all files (`'*'`) with extensions `js`, `mjs` and `json`.

To stop the server we still need to use `CTRL+C`.

Alright we now have something that starts to look useful and meaningful.

### HTTP status codes

`HTTP requests` usually have status codes, represented by 3 digits. A complete list and description can be found [here](https://umbraco.com/knowledge-base/http-status-codes/). You probably already heard of the infamous code `404` meaning not found. You might have seen this on your browser when going to a url that no more exists.

We will list here the most used ones:

| Code | Meaning               | Description                                          |
| ---- | --------------------- | ---------------------------------------------------- |
| 200  | OK                    | Everything went well                                 |
| 201  | Created               | Following a resource creation using POST             |
| 400  | Bad Request           | Client didn't formulate a proper request             |
| 401  | Unauthorized          | The client is not authorized                         |
| 403  | Forbidden             | The client is not allowed to access this resource    |
| 404  | Not Found             | The requested resource cannot be found by the server |
| 500  | Internal Server Error | The server could not process the request             |
| 503  | Service Unavailable   | The server resource is not available                 |

It would be great if our server was sending back that status. Well we have that out of the box!!
We can simply add `status(200)` to our `response`.

_index.js_

```js
...
app.get("/", (req, res) => {
  res.status(200).send("It is working!!");
});
...
```

Unfortunately, adding the status `200` to a get request will have no impact on the client as a successful replied `GET request` will by default get the status `200`.

But we can still visualize this. Lets put a different code, like 201.

_index.js_

```js
...
app.get("/", (req, res) => {
  res.status(201).send("It is working!!");
});
...
```

There you go, if you use `postman` you will now have a status of `201 Created`.

Let's see how to do this with `curl`.

Type the following in your terminal:

```
$ curl -I -s -L http://localhost:3001
```

You will get the details of the server response with `201 Created` next to `HTTP/1.1`:

```
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 15
ETag: W/"f-p0FlVEJy4AJNOk2qzTM7pbmjY5Y"
Date: Sun, 20 Feb 2022 12:19:14 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

---

## CRUD implementation

Let's make our code doing something the simulates what we would have in real life.
`CRUD` means:

- Create
- Read
- Update
- Delete
  This now probably sounds familiar as we created our routes with the methods `GET`, `POST`, `PUT` and `DELETE`.

### Data mockup

For the exercise let's simulate data containing a list of people that we can modify. Every person has a name and last name. We start with a non empty data, the mockup data in the form of an array of objects and to make it extremely simple we will put this data in the `index.js` file. This is of course NOT a good practice, is purely for educational purposes.

```js
...
let data = [
  {
    id:0,
    name: "Lewis",
    lastName: "Hamilton",
  },
  {
    id:1,
    name: "Pablo",
    lastName: "Montoya",
  },
  {
    id:2,
    name: "Jacques",
    lastName: "Villeneuve",
  },
  {
    id:3,
    name: "Fernando",
    lastName: "Alonso",
  },
];
...
```

The `id` property will allow us to uniquely identify a person.

### Retrieve data (READ)

Our `GET request` on the root route `'/'` requires some modification so that we can return the content of the `data` variable:

```js
app.get("/", (req, res) => {
  res.status(200).json(data);
});
```

If we create a `GET request` on the browser or with `curl`:

```
$ curl localhost:3001
```

We get our `data` content in return:

```
[{"id":0,"name":"Lewis","lastName":"Hamilton"},{"id":1,"name":"Pablo","lastName":"Montoya"},{"id":2,"name":"Jacques","lastName":"Villeneuve"},{"id":3,"name":"Fernando","lastName":"Alonso"}]
```

### Add data (CREATE)

To create a new person we will use the `post` method to the `/add` route.

So we modified the route accordingly:

_index.js_

```js
app.post("/add", (req, res) => {
  const newPerson = req.body;
  // First we check if this person is already our data bu checking both name and lastName. If the result of the filter is not an empty array then the person is already in our data. We save the result to "isInData" as a boolean.
  const isInData =
    data.filter(
      (person) =>
        person.name === newPerson.name && person.lastName === newPerson.lastName
    ).length !== 0;
  // If this person is in our data then we send back a json package with a message property and a status 409 Conflict. If not we add the person by first generating his id. Here we just increment the last id in the data and add the property to our new person, sufficient for educational purposes here.
  if (isInData) {
    res.status(409).json({ message: "The person is already in the list!" });
  } else {
    newPerson.id = data[data.length - 1].id + 1;
    console.log(newPerson);
    data.push(newPerson);
    console.log(data);
    res.status(201).json(newPerson);
  }
});
```

The 2 `console.log` on the bottom are just to allow us checking that the data is correctly processed.

We complete this by returning a `json` object with the new person including his `id` as well as a `201 Created` status.

If we `curl` a `post request` as follows:

```
curl -X POST -H "Content-Type: application/json" -d '{"name": "Max", "lastName": "Verstappen"}' http://localhost:3001/add
```

We get in return:

```
{ "name" : "Max" , "lastName" : "Verstappen" , "id" : 4 }
```

### Modify data (UPDATE)

First of all it is worth mentioning that if we are calling with different request methods we can still use the same endpoint. For instance for the `create` part above we used the `/update` endpoint but we could have used the root `'/'` route and it would still work.

Now here to make it simple we will use the root routes for both update and delete.

The way we selected to udpate a person is by sending to the server the `id` of the person we want to modify as a path parameter and the new version of the person in the request payload.

The way we send the path parameter is by adding it to the url. And the way for the server to catch it is by adding `/:id` to the path and then use `req.params.id` to access it:

_index.js_

```js
...
app.put("/:id", (req, res) => {
  console.log(req.params.id);
  res.status(200).json(req.params.id);
});
...
```

In this example we just send back the `id` to the client.

Let's 'curl' it! We will use the `PUT` method and add an `id` of `123` after the root route.

```
curl -X PUT 'http://localhost:3001/123'
```

The return is as expected:

```
123
```

Let's now add the code to modify our data, without forgeting to first check that the `id` requested is in our data.

_index.js_

```js
app.put("/:id", (req, res) => {
  // The reference variable helps recording where in our data array is located our requested id. The filter method gets the array components which have the requested id.
  let reference;
  const person = data.filter((person, index) => {
    if (person.id == req.params.id) {
      reference = index;
    }
    return person.id == req.params.id;
  })[0];
  // If the filter returns an empty array then person will be undefined and else code will run, otherwise the if code will run and modify the requested person.
  if (person) {
    data[reference] = {
      id: Number(req.params.id),
      name: req.body.name,
      lastName: req.body.lastName,
    };
    console.log(data);
    res.status(200).json(data[reference]);
  } else {
    res
      .status(404)
      .json({ message: `The id ${req.params.id} cannot be found` });
  }
});
```

We have filtered out the person with the requested `id`. If that `id` is in data then the name and lastName is updated. If not, an error message with status 404 is returned.

What if we curl this out?

```
curl -X PUT -H "Content-Type: application/json" -d '{"name": "Max", "lastName": "Verstappen"}' http://localhost:3001/2
```

We get in return the updated person:

```
{ "id" : 1 , "name" : "Max" , "lastName" : "Verstappen" }
```

### Remove data (DELETE)

`Delete` will mimic `put` with the path parameter `id`.
However, the code is actually much simpler. We just need to filter out our requested `id` and save that back into the data variable.

_index.js_

```js
app.delete("/:id", (req, res) => {
  const person = data.filter((person) => {
    return person.id == req.params.id;
  })[0];
  if (person) {
    data = data.filter((person) => person.id != req.params.id);
    console.log(data);
    res.status(200).json(person);
  } else {
    res
      .status(404)
      .json({ message: `The id ${req.params.id} cannot be found` });
  }
});
```

We still kept the person to delete so that we can return it in the success deletion code.

This is our final `curl`

```
curl -X DELETE http://localhost:3001/2
```

And we get a response with the person who got deleted:

```
{ "id" : 1 , "name" : "Lewis" , "lastName" : "Hamilton" }
```

The server terminal prints out the updated data:

```
[
  { id: 2, name: 'Pablo', lastName: 'Montoya' },
  { id: 3, name: 'Jacques', lastName: 'Villeneuve' },
  { id: 4, name: 'Fernando', lastName: 'Alonso' }
]
```

---

## Final code

After removing the `/list` route and also the `/add` on the post route here is the final code:

_index.js_

```js
const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 3001;

let data = [
  {
    id: 1,
    name: "Lewis",
    lastName: "Hamilton",
  },
  {
    id: 2,
    name: "Pablo",
    lastName: "Montoya",
  },
  {
    id: 3,
    name: "Jacques",
    lastName: "Villeneuve",
  },
  {
    id: 4,
    name: "Fernando",
    lastName: "Alonso",
  },
];

app.use(express.json());

// app.get("/", (req, res) => {
//   res.status(200).send("It is working!!");
// });

app.get("/", (req, res) => {
  res.status(200).json(data);
});

app.post("/", (req, res) => {
  const newPerson = req.body;
  // First we check if this person is already our data bu checking both name and lastName. If the result of the filter is not an empty array then the person is already in our data. We save the result to "isInData" as a boolean.
  const isInData =
    data.filter(
      (person) =>
        person.name === newPerson.name && person.lastName === newPerson.lastName
    ).length !== 0;
  // If this person is in our data then we send back a json package with a message property and a status 409 Conflict. If not we add the person by first generating his id. Here we just increment the last id in the data and add the property to our new person, sufficient for educational purposes here.
  if (isInData) {
    res.status(409).json({ message: "The person is already in the list!" });
  } else {
    newPerson.id = data[data.length - 1].id + 1;
    console.log(newPerson);
    data.push(newPerson);
    console.log(data);
    res.status(201).json(newPerson);
  }
});

app.put("/:id", (req, res) => {
  // The reference variable helps recording where in our data array is located our requested id. The filter method gets the array components which have the requested id.
  let reference;
  const person = data.filter((person, index) => {
    if (person.id == req.params.id) {
      reference = index;
    }
    return person.id == req.params.id;
  })[0];
  // If the filter returns an empty array then person will be undefined and else code will run, otherwise the if code will run and modify the requested person.
  if (person) {
    data[reference] = {
      id: Number(req.params.id),
      name: req.body.name,
      lastName: req.body.lastName,
    };
    console.log(data);
    res.status(200).json(data[reference]);
  } else {
    res
      .status(404)
      .json({ message: `The id ${req.params.id} cannot be found` });
  }
});

app.delete("/:id", (req, res) => {
  const person = data.filter((person) => {
    return person.id == req.params.id;
  })[0];
  if (person) {
    data = data.filter((person) => person.id != req.params.id);
    console.log(data);
    res.status(200).json(person);
  } else {
    res
      .status(404)
      .json({ message: `The id ${req.params.id} cannot be found` });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port} `);
});
```

---

## Disclaimer

This is just designed to help those like me in the dark and trying to get started. Its only purpose is to provide a step by step process to get an [ExpressJS](https://expressjs.com) server up and running with CRUD capabilities. The code here is absolutely NOT state of the art and again it is for educational purposes only.

---

## Next steps

From here there are some natural and somehow obvious steps or directions.

1. Put the routes code in a different file, maybe called `routes`
2. Use a separate persistant data storage like a database (`mysql`, `sqlite`, `mongoDB`), a `json` server or even a `googlesheet`.
3. Connect a front end to go along with this backend
4. Add protected routes with authentication and authorization
5. Deploy to internet and share it with other people.

I am working on other written tutorials like this one, so keep posted!

## Credits

Obviously I am just a passionated _student_ 40+ years old. The more I learn and the more I realize how little I know. But I want to mention that there are great people out there putting out amazing content, particularly on youtube.
I will list here few of the youtube channels that helped me along the way, but the contributors to my knowledge fit in a much longer list.

[Traversymedia](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA)
Brad Traversy is just a great person, with top notch content. I believe that only few people get to this level of videos. 1.8M followers on Youtube, is insane! Any recent technology related to javascript Brad has most probably made a video or tutorial about it.

[Tech With Tim](https://www.youtube.com/channel/UC4JX40jDee_tINbkjycV4Sg) Tim is the prototype of millenaials who were born connected to a pc. His level of knowledge and detailed explanation is extremely useful. He covers a lot of topics, including interviews but also coding and software design.

[Ben Awad](https://www.youtube.com/user/99baddawg) Ben has a deep knowledge of javascript and particularly reactJS. Clear and to the point tutorials helps the viewer progressing very fast.

[Web Dev Simplified](https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw) Kyle is the go to when it comes to understanding how to design software. He has coverered most of the software design patterns

[PedroTech](https://www.youtube.com/channel/UC8S4rDRZn6Z_StJ-hh7ph8g) Pedro has a great channel with very nice playlists in tutorials covering javascript subjects in both front end and back end.

---

## Contact me

Feel free to contact me on thedivloop@gmail.com.
I am happy to take any feedback that can help me getting better or correct anything that would be wrong in any of my tutorials.
