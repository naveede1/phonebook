const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
];

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const selectedPerson = persons.find((person) => {
    return person.id === id;
  });
  if (selectedPerson) {
    res.json(selectedPerson);
  } else {
    console.log(id);
    res.status(404).end();
  }
});

app.post("/api/persons", (req, res) => {
  const contactInfo = req.body;
  console.log("🚀 ~ file: index.js:43 ~ app.post ~ contactInfo:", contactInfo);
  // in postman we will use the body function to add info to contactInfo/persons
  const newId = () => {
    const maxId =
      persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
    return maxId + 1;
  };
  if (!contactInfo.name) {
    console.log("Unsuccessful");
    return res.status(400).json({
      error: "name missing"
    });
  } else if (!contactInfo.number) {
    console.log("Unsuccessful");
    return res.status(400).json({
      error: "number missing"
    });
  } else {
    const person = {
      id: newId(),
      name: contactInfo.name,
      number: contactInfo.number
    };
    persons = persons.concat(person);

    res.json(person);
  }
});

app.delete("/api/persons/:id", (req, res) => {
  // the colon lets the system know that the url param is id
  const id = Number(req.params.id);
  // use a url param to locate the id of the obj we want to delete
  const selectedPerson = persons.find((person) => {
    return person.id === id;
    // searches for the person with the same id
  });
  const contactAfter = persons.filter((person) => {
    return person.id !== id;
    // creates a new filter arrays that does not include the selected person/id
  });
  if (selectedPerson) {
    console.log("Successful");
    persons = contactAfter;
    res.status(200).json("Person deleted from contacts");
    console.log(contactAfter);
  } else {
    console.log("Unsuccessful");
    console.log(id);
    res.status(204);
  }
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (req, res) => {
  res.send(`Phonebook has info for ${persons.length} people`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*

const findSameName = persons.find((person) => {
  persons.name === person.params.name
})
}

{
    "person": "Naveed Elias",
    "number": "403-991-0891"
}

const express = require("express");
const app = express();
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
];
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => {
    console.log(note.id, typeof note.id, id, typeof id, note.id === id);
    return note.id === id;
  });

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }

  console.log(note);
  response.json(note);
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing"
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId()
  };

  notes = notes.concat(note);

  response.json(note);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

*/
