import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFile = path.join(__dirname, "signup.json");

const readUsers = () => {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, "[]", "utf8");
    return [];
  }

  const data = fs.readFileSync(dataFile, "utf8").trim();
  if (!data) {
    fs.writeFileSync(dataFile, "[]", "utf8");
    return [];
  }

  try {
    return JSON.parse(data);
  } catch {
    fs.writeFileSync(dataFile, "[]", "utf8");
    return [];
  }
};

const writeUsers = (users) => {
  fs.writeFileSync(dataFile, JSON.stringify(users, null, 2), "utf8");
};

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(payload));
};

const parseBody = (req) =>
  new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error("Invalid JSON body"));
      }
    });

    req.on("error", (error) => reject(error));
  });

const server = http.createServer(async (req, res) => {
  const url = req.url;
  const method = req.method;

  if (method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  if (url === "/msg" && method === "GET") {
    res.end("This is welcome message from server");
    return;
  }

  if (url === "/sys" && method === "GET") {
    res.end("This is system information");
    return;
  }

  if (url === "/data" && method === "GET") {
    const users = readUsers();
    sendJson(res, 200, users);
    return;
  }

  if (url === "/users" && method === "GET") {
    const users = readUsers();
    sendJson(res, 200, { users });
    return;
  }

  if (url === "/signup" && method === "POST") {
    try {
      const body = await parseBody(req);
      const users = readUsers();
      const { name, email, password, age } = body;

      if (!name || !email || !password) {
        sendJson(res, 400, { message: "Name, email, and password are required" });
        return;
      }

      const existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        sendJson(res, 409, { message: "User already exists" });
        return;
      }

      const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name,
        email,
        password,
        age: age || null,
      };

      users.push(newUser);
      writeUsers(users);

      sendJson(res, 201, {
        message: "Signup successful!",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          age: newUser.age,
        },
      });
    } catch (error) {
      sendJson(res, 400, { message: error.message || "Invalid signup request" });
    }
    return;
  }

  if (url === "/login" && method === "POST") {
    try {
      const body = await parseBody(req);
      const { email, password } = body;
      const users = readUsers();
      const user = users.find(
        (entry) => entry.email === email && entry.password === password
      );

      if (!user) {
        sendJson(res, 401, { message: "Invalid email or password" });
        return;
      }

      sendJson(res, 200, {
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      sendJson(res, 400, { message: error.message || "Invalid login request" });
    }
    return;
  }

  if (url.startsWith("/user") && method === "GET") {
    const id = url.split("/")[2];
    const user = readUsers().find((entry) => String(entry.id) === String(id));

    if (!user) {
      sendJson(res, 404, { message: "User not found" });
      return;
    }

    sendJson(res, 200, user);
    return;
  }

  sendJson(res, 404, { message: "Route not found" });
});

server.listen(3000, () => {
  console.log("Server is running on port number 3000");
});