const security = (req, res, next) => {
  res.removeHeader("X-Powered-By");
  res.header("X-Frame-Options", "DENY");
  res.header("Strict-Transport-Security", "max-age=31536000");
  res.header("X-Content-Type-Options", "nosniff");
  res.header("Referrer-Policy", "same-origin");
  res.header("X-XSS-Protection", "1; mode=block");
  // for dev
  res.header("Access-Control-Allow-Origin", "http://localhost:1234");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
};

module.exports = security;
