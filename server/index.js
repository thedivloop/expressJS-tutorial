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
