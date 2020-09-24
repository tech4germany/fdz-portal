const mongoose = require("mongoose");
const Institution = require("../models/Institution");
const User = require("../models/User");
const Application = require("../models/Application");
const Script = require("../models/Script");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/fdz";

const create = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    await Institution.deleteMany({});
    await User.deleteMany({});
    await Application.deleteMany({});
    await Script.deleteMany({});

    const institution1 = { name: "RKI", email: "it@rki.de", password: "abc" };
    const institution1DB = await Institution.create(institution1);

    const user1 = {
      email: "it@rki.de",
      password: "abc",
      institution: null,
    };
    user1.institution = institution1DB._id;
    user1DB = await User.create(user1);

    const application1 = {
      name: "Diabetes Prävalenz",
      description: "Erster Antrag",
      queuePosition: 1,
      history: [],
      mainSteps: [],
    };
    application1.user = user1DB._id;
    application1.history.push({
      action: "application_submitted",
      user: user1DB._id,
      date: "1600954411",
    });
    application1.history.push({
      action: "application_unchecked",
      user: user1DB._id,
      date: "1600954412",
    });
    application1.history.push({
      action: "application_checked",
      user: user1DB._id,
      date: "1600954662",
    });
    application1.history.push({
      action: "testdata_prepared",
      user: user1DB._id,
      date: "1600954663",
    });
    application1.mainSteps.push({ id: 1, status: "done", date: 1600954662 });
    application1.mainSteps.push({ id: 2, status: "current", date: 1600954663 });
    application1.status = "testdata_prepared";
    application1DB = await Application.create(application1);

    const application2 = {
      name: "Covid",
      description: "Zweiter Antrag",
      queuePosition: 2,
      history: [],
      mainSteps: [],
    };
    application2.user = user1DB._id;
    application2.history.push({
      action: "application_submitted",
      user: user1DB._id,
      date: "1600956411",
    });
    application2.mainSteps.push({ id: 1, status: "current", date: 1600954662 });
    application2DB = await Application.create(application2);

    const script1 = { fileName: "script1.sql", queuePosition: 1 };
    script1.user = user1DB._id;
    script1.application = application1DB._id;
    script1DB = await Script.create(script1);
    await mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
  console.log("seeding done");
};

create();
