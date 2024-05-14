import { Router } from "express";

const router = Router();

router.route("/").get((req, res) => {
  res.json({ success: "This is user route!" });
});

export default router;
