const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view enging")
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());

const users = [
    { id: 1, name: "John Wayne", email: "johnwayne@gmail.com" },
    { id: 2, name: "John Dajao", email: "jdajao@gmail.com" },
    { id: 3, name: "Johnny Tet", email: "Jtest@gmail.com"},
];

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    res.render("index", { users });
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
    const { name, email } = req.body;
    const newUser = {id: Date.now(), name, email};
    users.push(newUser);
    res.redirect("/users");
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

app.get("/users/:id/edit", (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    res.render("edit", { user });
});

app.post("/users/:id", (req, res) => {
    const { name, email } = req.body;
    const user = users.find ((u) => u.id === parseInt(req.params.id));
    if (user) {
        user.name = name;
        user.email = email;
        
    }
    res.redirect("/users");
})

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
