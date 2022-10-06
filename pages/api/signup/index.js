import dbConnect from "../../../lib/db-connect";
import User from "../../../models/user";
import bcrypt from "bcrypt";

export default async function handler(req, res, next) {
  try {
    await dbConnect();

    const doesExist = await User.findOne({ email: req.body.email });
    if (doesExist) {
      return res.status(401).json({ status: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 8);
    const user = new User({
      ...req.body,
      password: hashPassword,
    });
    const saveUser = await user.save();

    if (saveUser) {
      const userDoc = saveUser._doc;
      delete userDoc.password;
      return res.status(201).json({ status: "User Created" });
    } else {
      return res.status(401).json({ status: "User Not Created" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ status: "Not able to create a new user.", error });
  }
}
