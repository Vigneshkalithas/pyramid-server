import jwt from "jsonwebtoken";

const authorize = async (req, res, next) => {
  try {
    // console.log(req);
    const userToken = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(userToken, process.env.SECRET);

    // const decodedToken = "iamUsingSecrityWord";
    if (decodedToken) {
      next();
      return res
        .status(200)
        .send({ error: false, message: "authorized user,verified" });
    }
  } catch (error) {
    return res.status(404).send({ error: true, message: "not authorized" });
  }
};

export { authorize };
