import dbConnect from "../../../lib/db-connect";
import User from "../../../models/user";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.JWT_SECRET;

export default async function handler(req, res) {
  try {
    await dbConnect();

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const cmp = await bcrypt.compare(req.body.password, user.password);
      if (cmp) {
        //   jwt or sessions
        const token = sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            userId: user._id,
          },
          secret
        );

        const serialized = serialize("PokemonToken", token, {
          httpOnly: true,
          // maxAge: 20, // Expires after 20sec
          maxAge: 3600, // Expires after 1hr
          path: "/",
        });
        res.setHeader("Set-Cookie", serialized);

        return res.status(201).json({ status: "Auth Successful", data: user });
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
