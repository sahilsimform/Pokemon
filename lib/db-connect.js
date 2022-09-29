// import mongoose from "mongoose";

// global.mongoose = {
//   conn: null,
//   promise: null,
// };

// export async function dbConnect() {
//   if (global.mongoose && global.mongoose.conn) {
//     console.log("Using Existing mongoose connection");
//     return global.mongoose.conn;
//   } else {
//     console.log("Creating new mongoose connection");

//     const user = process.env.MONGODB_USER;
//     const password = process.env.MONGODB_PASSWORD;
//     const database = process.env.MONGODB_DATABASE;

//     const conString = `mongodb+srv://${user}:${password}@cluster0.fnwd1.mongodb.net/${database}?retryWrites=true&w=majority`;

//     const promise = mongoose
//       .connect(conString, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         autoIndex: true,
//       })
//       .then((mongoose) => mongoose);

//     global.mongoose = {
//       conn: await promise,
//       promise,
//     };

//     return await promise;
//   }
// }

import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  const user = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;
  const database = process.env.MONGODB_DATABASE;

  const conString = `mongodb+srv://${user}:${password}@cluster0.fnwd1.mongodb.net/${database}?retryWrites=true&w=majority`;

  const db = await mongoose
    .connect(conString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    })
    .then((mongoose) => mongoose);

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
