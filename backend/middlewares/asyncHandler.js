const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.error("Internal Server Error:", error);

    return res.status(500).json({ error: "Unexpected Internal Server Error!" });
  });
};

export default asyncHandler;
