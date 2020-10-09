const mongoose = require("mongoose");
const Institution = require("../models/Institution");
const User = require("../models/User");
const Application = require("../models/Application");
const Script = require("../models/Script");
const { hash } = require("./crypter");
const { MAIN_STEPS } = require("../const/steps.js");

const crypto = require("crypto");

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

    // FDZ User
    const userFDZ = {
      email: "support@fdz.de",
      password: hash("abc"),
      forename: "FDZ",
      surname: "Employee",
      role: "fdz",
    };
    User.create(userFDZ);

    // Research institution
    const institution1 = {
      name: "RKI",
      email: "forschung@rki.de",
      password: "abc",
    };
    const institution1DB = await Institution.create(institution1);

    // Research user 1
    const user1 = {
      email: "forschung@rki.de",
      password: hash("abc"),
      role: "researcher",
      forename: "Peter",
      surname: "Ihle",
      institution: institution1DB._id,
    };
    user1DB = await User.create(user1);

    // Research user 2
    const user2 = {
      email: "data@rki.de",
      password: hash("abc"),
      role: "researcher",
      forename: "Max",
      surname: "Wheile",
      institution: institution1DB._id,
    };
    user2DB = await User.create(user2);

    // Application Off-Label-Use
    const application3 = {
      name: "Off-Label-Use",
      description: "Für Studie zum Off-Label-Use",
      queuePosition: 3,
      history: [],
      mainSteps: [],
      users: [],
    };
    application3.users.push(user2DB._id);
    application3.institution = institution1DB._id;
    application3.history.push({
      name: "application_submitted",
      mainStep: 1,
      user: user1DB._id,
      date: 1600956412400,
    });
    application3.history.push({
      name: "application_unchecked",
      user: user1DB._id,
      mainStep: 1,
      time: "1 - 2 Wochen",
      date: 1600954123400,
    });
    application3.status =
      application3.history[application3.history.length - 1].name;
    application3DB = await Application.create(application3);

    // Application Covid
    const application2 = {
      name: "Covid",
      description: "Zweiter Antrag",
      queuePosition: 2,
      history: [],
      mainSteps: [],
      users: [],
    };
    application2.users.push(user1DB._id);
    application2.institution = institution1DB._id;
    application2.history.push({
      name: "application_submitted",
      mainStep: 1,
      user: user1DB._id,
      date: 1600956411000,
    });
    application2.history.push({
      name: "application_unchecked",
      user: user1DB._id,
      mainStep: 1,
      time: "1 - 2 Wochen",
      date: 1600954123000,
    });
    application2.status =
      application2.history[application2.history.length - 1].name;
    application2DB = await Application.create(application2);

    // Application Diabetis
    const application1 = {
      name: "Diabetes Prävalenz",
      description: "Erster Antrag",
      queuePosition: 1,
      history: [],
      mainSteps: [],
      users: [],
    };
    application1.users.push(user1DB._id);
    application1.institution = institution1DB._id;
    application1.history.push({
      name: "application_submitted",
      user: user1DB._id,
      mainStep: 1,
      date: 1600954411000,
    });
    application1.history.push({
      name: "application_unchecked",
      user: user1DB._id,
      mainStep: 1,
      date: 1600954412000,
    });
    application1.history.push({
      name: "application_checked",
      user: user1DB._id,
      mainStep: 1,
      date: 1600954662000,
    });
    application1.history.push({
      name: "testdata_undelivered",
      mainStep: 2,
      user: user1DB._id,
      date: 1600954663000,
    });
    application1.history.push({
      name: "testdata_delivered",
      mainStep: 2,
      user: user1DB._id,
      date: 1601128885000,
    });
    application1.history.push({
      name: "script_unsubmitted",
      mainStep: 3,
      user: user1DB._id,
      date: 1601128891000,
    });
    application1.history.push({
      name: "script_submitted",
      mainStep: 3,
      variable: "test.sql",
      user: user1DB._id,
      date: 1601248891000,
    });
    application1.history.push({
      name: "script_unexecuted",
      mainStep: 3,
      time: "2 - 3 Wochen",
      user: user1DB._id,
      date: 1601248991000,
    });
    application1.history.push({
      name: "script_failed",
      mainStep: 3,
      variable: "test.sql",
      message: 'Syntax error in SQL statement "SELECT * FORM * "',
      user: user1DB._id,
      date: 1601248991000,
    });
    application1.history.push({
      name: "script_needs_update",
      mainStep: 3,
      variable: "test.sql",
      user: user1DB._id,
      date: 1601248991000,
    });
    application1.status =
      application1.history[application1.history.length - 1].name;
    application1DB = await Application.create(application1);

    // First srcript
    const script1 = { fileName: "script1.sql", queuePosition: 1 };
    script1.user = user1DB._id;
    script1.application = application1DB._id;
    script1DB = await Script.create(script1);

    await mongoose.connection.close();
  } catch (error) {
    console.log(error);
    process.exit();
  }
  console.log("seeding done");
};

create();
