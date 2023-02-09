import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ _id: id + Date.now() }, process.env.SECRET, {
    expiresIn: "20d",
  });
};

export default generateToken;
