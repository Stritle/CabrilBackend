import jwt from "jsonwebtoken";

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "48h",
    }
  );
};
const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(0, token.length);
    jwt.verify(onlyToken, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: "Invalid Token" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: "Token is not supplied." });
  }
};
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ msg: "Admin Token is not valid" });
};
export { getToken, isAdmin, isAuth };
