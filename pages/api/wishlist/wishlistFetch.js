import dbConnect from "../../../lib/db-connect";
import User from "../../../models/user";
import * as jwt_decode from "jwt-decode";

export default async function handler(req, res) {
  await dbConnect();
  const jwt = req.headers.authorization;

  if (jwt) {
    const decoded = jwt_decode(jwt);

    if (decoded) {
      const userId = decoded.userId;

      if (userId) {
        const user = await User.findOne({ _id: userId });

        if (user) {
          const userWishlist = user.wishlist;

          if (userWishlist) {
            return res.status(201).json({
              status: "success",
              data: userWishlist,
            });
          } else {
            return res.status(401).json({
              status: "error",
              err: "No wishlist found",
            });
          }
        } else {
          return res.status(401).json({
            status: "error",
            err: "No user found",
          });
        }
      } else {
        return res.status(401).json({
          status: "error",
          err: "No userId found",
        });
      }
    }
  } else {
    return res.status(401).json({
      status: "error",
      err: "no jwt",
    });
  }
}
