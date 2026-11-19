import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.all("/", (req, res) => {
  console.log(req, "request");
  console.log(res, "response");
  res.send("Hello world");
});

const todos = [
  {
    id: "1",
    title: "Task 1",
    completed: false,
  },
  {
    id: "2",
    title: "Task 2",
    completed: true,
  },
];

// Read
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Create

app.post("/todos", (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.json({ message: "New Todo Created Successfully" });
});

// Update
app.put("/todos/:id", (req, res) => {
  const updateTodo = req.body;
  const reqParamsID = req.params.id;

  const todoIndex = todos.findIndex((td) => td.id === reqParamsID);

  if (todoIndex !== -1) {
    todos[todoIndex] = {
      id: reqParamsID,
      ...updateTodo,
    };
  }

  res.json({
    message: "Todo upadted successfully",
  });
});

// Delete
app.delete("/todos/:id", (req, res) => {
  const todoParamsID = req.params.id;

  const todoFindIndex = todos.findIndex((td) => td.id === todoParamsID);

  if (todoFindIndex !== -1) {
    todos.splice(todoParamsID, 1);
  }

  res.json({
    message: "Todo deleted successfully",
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
