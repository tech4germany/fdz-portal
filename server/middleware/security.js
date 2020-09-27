const security = (req, res, next) => {
  res.removeHeader("X-Powered-By");
  res.header("X-Frame-Options", "DENY");
  res.header("Strict-Transport-Security", "max-age=31536000");
  res.header("X-Content-Type-Options", "nosniff");
  res.header("Referrer-Policy", "same-origin");
  res.header("X-XSS-Protection", "1; mode=block");
  // for dev
  res.header("Access-Control-Allow-Origin", "*");
  next();
};

module.exports = security;
