import { Admin } from "../model/admin.model.js";
import bcrypt from "bcrypt";
import moment from "moment-timezone";
import generateToken from "../utils/generateToken.js";
import { Sessions } from "../model/Session.model.js";

const Register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const ExistUser = await Admin.findOne({ username: username });

    if (!ExistUser) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const adminData = {
        username,
        password: hash,
      };
      const admin = new Admin(adminData);
      await admin.save();
      res.status(200).send({
        error: false,
        message: "user created successfully",
      });
    } else {
      res.status(404).send({ error: true, message: "user already exists" });
    }
  } catch (error) {
    res.status(404).send({ error: true, message: "something went wrong" });
  }
};

const Signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username: username });
    if (admin) {
      bcrypt.compare(password, admin.password, async (error, result) => {
        if (!result)
          res.status(401).send({ error: true, message: "invalid credential" });
        if (result) {
          const token = generateToken({ _id: admin._id });
          const sessionData = new Sessions({
            adminId: admin._id,
            token,
          });
          const Datas = {
            adminId: sessionData.adminId,
            token: sessionData.token,
          };
          await admin.save();
          await sessionData.save();
          res.status(200).json({
            error: false,
            message: "logged in successfully",
            Datas,
          });
        }
      });
    } else {
      res.status(404).send({ message: "invalid credentials" });
    }
  } catch (error) {
    res
      .status(404)
      .send({ error: true, message: "sorry something went wrong" });
  }
};

const Logout = async (req, res) => {
  try {
    const { token } = req.body;

    const expireCheck = await Sessions.findOneAndUpdate(
      { token },
      { expired: true }
    );

    await expireCheck.save();
    res.status(200).send({ error: false, message: "logout succesfully" });
  } catch (error) {
    res
      .status(404)
      .send({ error: true, message: "sorry something went wrong" });
  }
};

export { Register, Signin, Logout };
