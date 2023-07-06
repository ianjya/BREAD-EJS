const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
const port = 3000;
app.use(methodOverride("_method"));

// Data users
let users = [
  {
    stringField: "Sample String",
    integerField: 123,
    floatField: 3.14,
    dateField: "2023-06-30",
    booleanField: true,
  },
  {
    stringField: "Another String",
    integerField: 456,
    floatField: 2.71,
    dateField: "2023-07-01",
    booleanField: false,
  },
  {
    stringField: "Lorem Ipsum",
    integerField: 789,
    floatField: 4.2,
    dateField: "2023-07-02",
    booleanField: true,
  },
  {
    stringField: "Example Text",
    integerField: 101112,
    floatField: 1.23,
    dateField: "2023-07-03",
    booleanField: false,
  },
  {
    stringField: "Test Data",
    integerField: 131415,
    floatField: 0.99,
    dateField: "2023-07-04",
    booleanField: true,
  },
  {
    stringField: "New Entry",
    integerField: 161718,
    floatField: 5.67,
    dateField: "2023-07-05",
    booleanField: false,
  },
  {
    stringField: "Random String",
    integerField: 192021,
    floatField: 3.33,
    dateField: "2023-07-06",
    booleanField: true,
  },
  {
    stringField: "Data Example",
    integerField: 222324,
    floatField: 2.22,
    dateField: "2023-07-07",
    booleanField: false,
  },
  {
    stringField: "Lorem Ipsum Dolor",
    integerField: 252627,
    floatField: 1.11,
    dateField: "2023-07-08",
    booleanField: true,
  },
  {
    stringField: "Sample Data",
    integerField: 282930,
    floatField: 4.44,
    dateField: "2023-07-09",
    booleanField: false,
  },
];

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/list", (req, res) => {
  res.render("list", { users });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", (req, res) => {
  const { stringField, integerField, floatField, dateField, booleanField } =
    req.body;
  const id = users.length + 1;
  const newUser = {
    id,
    stringField,
    integerField,
    floatField,
    dateField,
    booleanField,
  };
  users.push(newUser);
  res.redirect("/list");
});

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const user = users[id];
  res.render("edit", { user, id });
});

app.post("/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((user) => user.id === id);
  const { stringField, integerField, floatField, dateField, booleanField } =
    req.body;
  users[index] = {
    ...users[index],
    stringField,
    integerField,
    floatField,
    dateField,
    booleanField,
  };
  res.redirect("/list");
});

app.get("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users.splice(id, 1);
  res.redirect("/list");
});

// Server
app.listen(port, () => {
  console.log(`BREAD App is running on http://localhost:${port}`);
});
