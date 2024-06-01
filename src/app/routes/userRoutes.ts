import { Router} from "express";

const userRouter = Router();

export default userRouter
  .get("/me")
  .post("/me")
  .patch("/me")
  .get("/:id")
  .delete("/:id")