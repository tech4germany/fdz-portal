const mongoose = require("mongoose");
const Institution = require("../models/Institution");
const User = require("../models/User");
const Application = require("../models/Application");
const Script = require("../models/Script");
const Time = require("../models/Time");
const { hash } = require("./crypter");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/fdz";

const connectDB = async () => {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

const cleanDB = async () => {
  await Institution.deleteMany({});
  await User.deleteMany({});
  await Application.deleteMany({});
  await Script.deleteMany({});
  await Time.deleteMany({});
};

const createInstitution = async (name, email) => {
  return await Institution.create({
    name,
    email,
    password: "abc",
  });
};

const createUser = async (email, role, forename, surname, institution) => {
  return await User.create({
    email,
    password: hash("abc"),
    role,
    forename,
    surname,
    institution,
  });
};

const createApplication = async (
  name,
  description,
  institution,
  history,
  users
) => {
  return await Application.create({
    name,
    description,
    queuePosition: 0,
    institution,
    status: history[history.length - 1].name,
    history,
    users,
  });
};

const createScript = async (fileName, queuePosition, user, application) => {
  return await Script.create({
    fileName,
    queuePosition,
    user,
    application,
  });
};

const createTime = async (
  application = "1 - 2 Wochen",
  testdata = "1 - 2 Wochen",
  scriptPartial = "2 - 3 Wochen",
  scriptFull = "4 - 6 Wochen"
) => {
  return await Time.create({
    application,
    testdata,
    scriptPartial,
    scriptFull,
  });
};

const seedInit = async () => {
  await connectDB();
  await cleanDB();

  await createTime();

  const institution = await createInstitution("RKI", "forschung@rki.de");
  const userFDZ = await createUser("support@fdz.de", "fdz", "FDZ", "Employee");
  const userRe1 = await createUser(
    "forschung@rki.de",
    "research",
    "Peter",
    "Ihle",
    institution._id
  );
  const userRe2 = await createUser(
    "data@rki.de",
    "research",
    "Max",
    "Wheile",
    institution._id
  );

  const application1 = await createApplication(
    "Off-Label-Use",
    "Studie zum Off-Label-Use von Medikamenten",
    institution._id,
    [
      {
        name: "application_submitted",
        mainStep: 1,
        user: userRe2._id,
        date: 1600956412400,
      },
      {
        name: "application_unchecked",
        user: userRe2._id,
        mainStep: 1,
        time: "1 - 2 Wochen",
        date: 1600954123400,
      },
    ],
    [userRe2._id]
  );
  const application2 = await createApplication(
    "Covid Prävalenz",
    "Covid Deutschland Studie",
    institution._id,
    [
      {
        name: "application_submitted",
        mainStep: 1,
        user: userRe1._id,
        date: 1600956411000,
      },
      {
        name: "application_unchecked",
        user: userRe1._id,
        mainStep: 1,
        time: "1 - 2 Wochen",
        date: 1600954123000,
      },
    ],
    [userRe1._id]
  );
  const application3 = await createApplication(
    "Diabetes Prävalenz",
    "Studie zur Diabetes Prävalenz in Berlin",
    institution._id,
    [
      {
        name: "application_submitted",
        user: userRe1._id,
        mainStep: 1,
        date: 1600954411000,
      },
      {
        name: "application_unchecked",
        user: userRe1._id,
        mainStep: 1,
        date: 1600954412000,
      },
      {
        name: "application_checked",
        user: userRe1._id,
        mainStep: 1,
        date: 1600954662000,
      },
      {
        name: "testdata_undelivered",
        mainStep: 2,
        user: userRe1._id,
        date: 1600954663000,
      },
      {
        name: "testdata_delivered",
        mainStep: 2,
        user: userRe1._id,
        date: 1601128885000,
      },
      {
        name: "script_unsubmitted",
        mainStep: 3,
        user: userRe1._id,
        date: 1601128891000,
      },
      {
        name: "script_submitted",
        mainStep: 3,
        variable: "test.sql",
        user: userRe1._id,
        date: 1601248891000,
      },
      {
        name: "script_unexecuted",
        mainStep: 3,
        time: "2 - 3 Wochen",
        user: userRe1._id,
        date: 1601248991000,
      },
      {
        name: "script_failed",
        mainStep: 3,
        variable: "test.sql",
        message: 'Syntax error in SQL statement "SELECT * FORM * "',
        user: userRe1._id,
        date: 1601248991000,
      },
      {
        name: "script_needs_update",
        mainStep: 3,
        variable: "test.sql",
        user: userRe1._id,
        date: 1601248991000,
      },
    ],
    [userRe1._id]
  );

  await mongoose.connection.close();
  console.log("init seeding done");
};

//await mongoose.connection.close();

// console.log(error);
// process.exit();

// console.log("seeding done");
seedInit();
