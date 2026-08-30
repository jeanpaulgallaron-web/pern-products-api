export const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    message: "API is running!"
  });
};