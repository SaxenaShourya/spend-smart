import { Router } from "express";

const router = Router();

router.route("/").get((req, res) => {
  res.json({ success: "Expense Route" });
});

export default router;
