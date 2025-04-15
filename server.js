const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view enging")
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());

const users = [
    { id: 1, name: "John Wayne"},
    { id: 2, name: "John Dajao"},
    { id: 3, name: "Johnny Test"},
];

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    res.json("index", { users });
});

app.get("/users/new", (req, res) => {
    res.render("new");
});


app.get("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send("User not found");
    }
});

app.post("/users", (req, res) => {
    const newUser = {
        id: Date.now(),
        name: req.body.name,    
    }
    users.push(newUser); 
    res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
    const userId = users.find((u) => u.id === parseInt(req.params.id));
    if (userId) {
        userId.id = req.body.id;
        userId.name = req.body.name;
        res.json(userId);
    } else {
        res.status(404).send("User not found");
    }
});

app.delete("/users/:id", (req, res) => {
    const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send("User not found");
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
