import express from "express"
import UserController from "../controllers/UserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateUserRequest } from "../middleware/validation";


const router = express.Router();

router.get("/", jwtCheck, jwtParse, UserController.getCurrentUser);
// router.get("/", (req, res) => {
//     res.json({message: " Hello there"});
// });
router.post("/", jwtCheck, UserController.createCurrentUser);
router.put("/", jwtCheck, jwtParse, validateUserRequest, UserController.updateCurrentUser);

export default router;