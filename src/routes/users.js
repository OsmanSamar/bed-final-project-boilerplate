import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import getUserById from "../services/users/getUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";
import updateUserById from "../services/users/updateUserById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await getUsers();

    // console.log("Users from route:", users); // Log users from the route
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { username, name, password, email, phoneNumber, profilePicture } =
      req.body;
    console.log("Request body:", req.body); // Log the request body
    const newUser = await createUser(
      username,
      name,
      password,
      email,
      phoneNumber,
      profilePicture
    );
    console.log("New user:", newUser); // Log the created user
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error:", error); // Log any errors
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({ message: `User with id ${id} not found` });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, password, username, email, phoneNumber, profilePicture } =
      req.body;
    const user = await updateUserById(id, {
      name,
      password,
      username,
      email,
      phoneNumber,
      profilePicture,
    });

    if (user) {
      res.status(200).send({
        message: `User with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `User with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await deleteUserById(id);

    if (user) {
      res.status(200).send({
        message: `User with id ${id} successfully deleted`,
        user,
      });
    } else {
      res.status(404).json({
        message: `User with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
