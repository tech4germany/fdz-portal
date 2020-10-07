# FDZ Portal

[Live Demo](http://18.157.185.96:8000/)

## Installation

**Requirements**

- Node.js 12.13.0+
- MongoDB 4.2+

Make sure that you installed [Node.js](https://nodejs.org/en/download/) and [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) is running:

```bash
git clone https://github.com/tech4germany/fdz-portal
cd fdz-portal
npm install
```

Copy the `.env.example` file and remove `.example` from the filename.

Next step is to seed the datbase with users and applications (you only need to do this once):

```bash
npm run seed
```

To start the app, simply run:

```bash
npm start
```

Go to your browser and enter `http://localhost:8000/`.

Use `forschung@rki.de` as username and the `abc` as password to sign in as a researcher and `support@fdz.de` : `abc` to sign in as a FDZ employee.

The application status is reset after each logout.
