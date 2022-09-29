import dbConnect from "../../../lib/db-connect";
import User from "../../../models/user";
import bcrypt from "bcrypt";

export default async function handler(req, res, next) {
  try {
    await dbConnect();

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const cmp = await bcrypt.compare(req.body.password, user.password);
      if (cmp) {
        //   jwt or sessions

        return res.status(201).json({ status: "Auth Successful" });
        // res.send("Auth Successful");
      } else {
        return res.status(401).json({ status: "Wrong email or password." });
        // res.send("Wrong username or password.");
      }
    } else {
      return res.status(401).json({ status: "Wrong email or password." });
      // res.send("Wrong email or password.");
    }
  } catch (error) {
    return res.status(500).send("Internal Server error Occured");
  }
}
