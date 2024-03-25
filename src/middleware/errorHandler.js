//Error Handling: Middleware can catch errors that occur during request processing
//and return appropriate error responses to clients.

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong!" });
};

export default errorHandler;
