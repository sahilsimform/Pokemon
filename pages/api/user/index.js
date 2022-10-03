/* eslint-disable import/no-anonymous-default-export */
export default function (req, res) {
  const { cookies } = req;

  const jwt = cookies.PokemonToken;

  console.log(jwt);

  res.json({ message: "SuccessFull with JWT token" });
}
