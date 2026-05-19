const loggerMiddleware = (req, res, next) => {

  const currentTime = new Date().toLocaleString();

  console.log(
    `[${currentTime}] User ${req.session.userId} made a POST request`
  );

  next();
};

module.exports = loggerMiddleware;