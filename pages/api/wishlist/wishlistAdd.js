import dbConnect from "../../../lib/db-connect";
import User from "../../../models/user";
import * as jwt_decode from "jwt-decode";

export default async function handler(req, res) {
  const jwt = req.cookies.PokemonToken;

  if (jwt) {
    const decoded = jwt_decode(jwt);

    if (decoded) {
      const userId = decoded.userId;

      if (userId) {
        await dbConnect();

        const user = await User.findOne({ _id: userId });

        if (user) {
          const userWishlist = user.wishlist;

          if (userWishlist) {
            const addedWishlist = await User.updateOne(
              { _id: userId },
              { $push: { wishlist: req.body.id } }
            );

            return res.status(201).json({
              status: "success",
              data: user,
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
