# FDZ Portal

[Live Demo](https://fdz.tech4germany.org/)

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
