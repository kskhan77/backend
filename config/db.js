const mongoose = require("mongoose");

const chalk = require("chalk");

const redColor = chalk.bold.red;
const greenColor = chalk.bold.green;

const config = require("config");

const connection = config.get("mongoURL");

//agar test fail ho jata hia to is ko mata dena he better hia
if (process.env.NODE_ENV == "test") {
  const Mockgoose = require("mockgoose").Mockgoose; //ager test fail ho to is ko mata do
  const mockgoose = new Mockgoose(mongoose);
  mockgoose.prepareStorage().then(() => {
    mongoose.connect(connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  });
} else {
  mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
}

mongoose.connection.on("connected", () =>
  console.log(greenColor("Connected to mongodb"))
);
mongoose.connection.on("error", (err) => console.log(redColor(err)));
