import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const helloWorldFn = (req: Request, res: Response, next: NextFunction) => {
  res.send("hello world");
};

const loginFn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    res.status(400).send("Bad Request");
  }
  const user = users.find(user => user.email == req.body.email && user.password == req.body.password);
  if (!user) {
    res.status(401).send("Unauthorized");
    return;
  }
  res.send({ ...user, token: Math.random().toString(36).substr(2, 20) });
};

const usersFn = (req: Request, res: Response) => {
  res.send(users);
};

const checkUser = (req: Request, res: Response) => {
  const query = req.query;
  const email = query.email?.toString() || "";
  if (users.find(user => user.email == email)) {
    res.status(200).send({ result: false });
  } else {
    res.status(200).send({ result: true });
  }
};

const createUser = (req: Request, res: Response) => {
  const { id, email, name, age, password } = req.body;
  users.push({ id, email, name, age, password });
  res.status(200).send({ result: true, users });
};

const users = [
  {
    id: "1cVf3e",
    email: "test@test.com",
    password: "1234",
    name: "테스트",
    age: 29
  },
  {
    id: "4fC2d3",
    email: "test2@test.com",
    password: "4567",
    name: "테스트2",
    age: 27
  }
];
app.get("/", helloWorldFn);
app.get("/user", checkUser);
app.post("/user", createUser);
app.get("/users", usersFn);
app.post("/login", loginFn);

app.listen(5005, () => {
  console.log("server running");
});

export default app;
