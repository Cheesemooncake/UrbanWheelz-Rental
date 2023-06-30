let express = require("express");
const path = require("path");
const app = express();
var bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(express.static("styles"));
const createPath = (page) => path.resolve(__dirname, "ejs_view", `${page}.ejs`);
app.get("/", function (req, res) {
  const title = "Start";
  res.render(createPath("index"), { title });
});


const startDir = __dirname;


app.get("/users", function (req, res) {
  const title = "Users";
  const MongoClient = require("mongodb").MongoClient;
  let mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
  async function getCollection() {
    try {
      await mongoClient.connect();
      const db = mongoClient.db("ProjectBase");
      const collection = db.collection("users");
      const result = await collection.find().toArray();
      res.render(createPath("users"), { result, title });
    } catch (err) {
      console.log(err);
    } finally {
      await mongoClient.close();
    }
  }
  getCollection().catch(console.error);
});
app.get("/users/:id", (req, res) => {
  const title = "User";
  const MongoClient = require("mongodb").MongoClient;
  let mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
  async function getCollection() {
    try {
      await mongoClient.connect();
      const db = mongoClient.db("ProjectBase");
      const collection = db.collection("users");
      const user = await collection
        .aggregate([
          {
            $match: {
              _id: new require("mongodb").ObjectId(req.params.id),
            },
          },
          { $unwind: "$transports" },
          {
            $lookup: {
              from: "transports",
              localField: "transports.transport._id",
              foreignField: "copys._id",
              as: "transportData",
            },
          },
        ])
        .toArray();
      res.render(createPath("user"), { user, title });
    } catch (err) {
      console.log(err);
    } finally {
      await mongoClient.close();
    }
  }
  getCollection().catch(console.error);
});
app.get("/transports", function (req, res) {
  const title = "Transport";
  const MongoClient = require("mongodb").MongoClient;
  let mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
  async function getCollection() {
    try {
      await mongoClient.connect();
      const db = mongoClient.db("ProjectBase");
      const collection = db.collection("transports");
      const transports = await collection.find().toArray();
      res.render(createPath("transports"), { transports, title });
    } catch (err) {
      console.log(err);
    } finally {
      await mongoClient.close();
    }
  }
  getCollection().catch(console.error);
});
app.get("/transports/:id", (req, res) => {
  const title = "Transport";
  const MongoClient = require("mongodb").MongoClient;
  let mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
  async function getCollection() {
    try {
      await mongoClient.connect();
      const db = mongoClient.db("ProjectBase");
      const collection = db.collection("transports");
      const transport = await collection
        .aggregate([
          {
            $match: {
              _id: new require("mongodb").ObjectId(req.params.id),
            },
          },
          { $unwind: "$copys" },
        ])
        .toArray();
      res.render(createPath("transport"), { transport, title });
    } catch (err) {
      console.log(err);
    } finally {
      await mongoClient.close();
    }
  }
  getCollection().catch(console.error);
});
app.get("/return", (req, res) => {
  const title = "Return transport";
  res.render(createPath("return"), { title });
});
app.post(
  "/return",
  bodyParser.text({ defaultCharset: "utf-8" }),
  function (req, res) {
    let copyId = req.body;
    console.log(copyId);
    const MongoClient = require("mongodb").MongoClient;
    let mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
    async function getCollection() {
      try {
        await mongoClient.connect();
        const db = mongoClient.db("ProjectBase");
        const collectionB = db.collection("transports");
        const collectionR = db.collection("users");
        await collectionB.updateOne(
          { "copys._id": new require("mongodb").ObjectId(copyId) },
          { $set: { "copys.$.status": "in storage" } }
        );
        await collectionR.updateOne(
          { "transports.transport._id": new require("mongodb").ObjectId(copyId) },
          {
            $set: {
              "transports.$.status": "returned",
              "transports.$.transport.status": "in storage",
            },
          }
        );
        const title = "Return transport";
        res.render(path.resolve(startDir, "ejs_view", `return.ejs`), { title });
      } catch (err) {
        console.log(err);
      } finally {
        await mongoClient.close();
      }
    }
    getCollection().catch(console.error);
  }
);
app.post("/deletingUser", bodyParser.text({ defaultCharset: "utf-8" }), (req, res) => {
    const MongoClient = require("mongodb").MongoClient;
  console.log(req.body)
    let mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
    async function getCollection() {
      try {
        await mongoClient.connect();
        const db = mongoClient.db("ProjectBase");
        const collection = db.collection("users");
        await collection.deleteOne({
          ticket: req.body,
        });
        res.send("ok");
      } catch (err) {
        console.log(err);
      } finally {
        await mongoClient.close();
      }
    }
    getCollection().catch(console.error);
  }
  );

app.post("/deleting", bodyParser.text({ defaultCharset: "utf-8" }), (req, res) => {
  const MongoClient = require("mongodb").MongoClient;
console.log(req.body)
  let mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
  async function getCollection() {
    try {
      await mongoClient.connect();
      const db = mongoClient.db("ProjectBase");
      const collection = db.collection("transports");
      await  collection.deleteOne({
        _id: new require("mongodb").ObjectId(req.body),
      });
      res.send("ok");
    } catch (err) {
      console.log(err);
    } finally {
      await mongoClient.close();
    }
  }
  getCollection().catch(console.error);
}
);

app.get("/addCopys", (req, res) => {
  const title = "Add Copys";
  res.render(createPath("addCopys"), { title });
});
app.get("/addUser", (req, res) => {
  const title = "Add User";
  res.render(createPath("addUser"), { title });
});
app.get("/giveTransport", (req, res) => {
  const title = "Give Transport";
  res.render(createPath("giveTransport"), { title });
});

app.get("/addTransport", (req, res) => {
  const title = "Add Transport";
  res.render(createPath("addTransport"), { title });
});
app.post("/addTransport", bodyParser.json(), function (req, res) {
  const MongoClient = require("mongodb").MongoClient;
  let mongoClient = new MongoClient("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoClient.connect();
  const db = mongoClient.db("ProjectBase");
  const collectionB = db.collection("transports");
  console.log(req.body);
  const { name, author, date, count } = req.body;
  collectionB
    .insertOne({
      name: name,
      author: author,
      copys: new Array(),
    })
    .then((transport) => {
      for (var i = 0; i < count; i++) {
        collectionB.findOneAndUpdate(
          { name: name, author: author },
          {
            $push: {
              copys: {
                _id: new require("mongodb").ObjectId(),
                date: new Date(date),
                status: "in storage",
              },
            },
          }
        );
      }
      res.send("ok");
    });
});
app.post("/addUser", bodyParser.json(), function (req, res) {
  const MongoClient = require("mongodb").MongoClient;
  let mongoClient = new MongoClient("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoClient.connect();
  const db = mongoClient.db("ProjectBase");
  const collectionR = db.collection("users");
  console.log(req.body);
  const {
    name,
    lastname,
    startRegistration,
    endRegistration,
  } = req.body;

  collectionR.insertOne({
    name: name,
    lastname: lastname,
    startRegistration: new Date(startRegistration),
    endRegistration: new Date(endRegistration),
    lendings: null,
    penalty: null
  })
  res.send("ok");
});
app.post("/giveTransport", bodyParser.json(), function (req, res) {
  const MongoClient = require("mongodb").MongoClient;
  let mongoClient = new MongoClient("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoClient.connect();
  const db = mongoClient.db("ProjectBase");
  const collectionR = db.collection("users");
  const collectionB = db.collection("transports");
  console.log(req.body);
  const { ticket, copyId, startDate, endDate } = req.body;

  collectionB
    .aggregate([
      { $unwind: "$copys" },
      {
        $match: {
          "copys._id": new require("mongodb").ObjectId(copyId),
        },
      },
    ])
    .toArray()
    .then((transport) => {
      collectionB.findOneAndUpdate(
        { "copys._id": new require("mongodb").ObjectId(copyId) },
        { $set: { "copys.$.status": "in use" } }
      );
      collectionR.findOneAndUpdate(
        { ticket: ticket },
        {
          $push: {
            transports: {
              transport:transport[0].copys, 
              startDate: new Date(startDate),
              endDate: new Date(endDate),
              status: "in use",
            },
          },
        }
      );
      res.send("ok");
    });
});

app.post("/addCopys", bodyParser.json(), function (req, res) {
  const MongoClient = require("mongodb").MongoClient;
  let mongoClient = new MongoClient("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoClient.connect();
  const db = mongoClient.db("ProjectBase");
  const collectionB = db.collection("transports");
  const { _id, date, count } = req.body;
  const id_transport = new require("mongodb").ObjectId(_id);
  console.log( req.body)
  for (var i = 0; i < count; i++) {
    collectionB.findOneAndUpdate(
      { _id: id_transport },
      {
        $push: {
          copys: {
            _id: new require("mongodb").ObjectId(),
            date: new Date(date),
            status: "in storage",
          },
        },
      }
    );
  }
  res.send("ok");
});

app.post("/date", bodyParser.json(), function (req, res) {
  let attr = req.body;
  const MongoClient = require("mongodb").MongoClient;
  let mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
  async function getCollection() {
    try {
      await mongoClient.connect();
      const db = mongoClient.db("FirstBase");
      const collection = db.collection("Names");
      const result = await collection
        .find({
          dateOfPublication: {
            $gte: attr.startDate,
            $lt: attr.endDate,
          },
        })
        .toArray();
      res.send(result);
    } catch (err) {
      console.log(err);
    } finally {
      await mongoClient.close();
    }
  }
  getCollection().catch(console.error);
});





app.listen(3010);
