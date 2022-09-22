require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const pg = require('pg');
const uploadsMiddleware = require('./uploads-middleware');
const path = require('path');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(express.json());

app.use(staticMiddleware);

app.post('/api/users/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        returning "userId", "username", "joinedAt"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/users/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.post('/api/ridelogs', uploadsMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const { location, date, caption, lat, lng } = req.body;
  if (!location || !date || !caption) {
    throw new ClientError(400, 'Missing Fields');
  }
  const photoUrl = path.join('/images', req.file.filename);
  const sql = `
    insert into "rideLogs" ("userId", "location", "visitedOn", "caption", "photoUrl", "lat", "lng")
    values ($1, $2, $3, $4, $5, $6, $7)
    returning *
  `;
  const params = [userId, location, date, caption, photoUrl, lat, lng];
  db.query(sql, params)
    .then(result => {
      const [log] = result.rows;
      res.status(201).json(log);
    })
    .catch(err => next(err));
});

app.get('/api/ridelogs/:logId', (req, res, next) => {
  const logId = Number(req.params.logId);
  if (!logId) {
    throw new ClientError(400, 'productId must be a positive integer');
  }
  const sql = `
    select "logId",
           "photoUrl",
           "location",
           "caption",
           "visitedOn"
      from "rideLogs"
      where "logId" = $1
  `;
  const params = [logId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find ride with logId ${logId}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/ridelogs', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select "logId",
           "photoUrl",
           "location",
           "caption",
           "visitedOn"
      from "rideLogs"
    where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/coords', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select "lat",
           "lng",
           "logId"
      from "rideLogs"
    where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/bikes', (req, res, next) => {
  const { userId } = req.user;
  const { make, model, year } = req.body;
  if (!make || !model || !year) {
    throw new ClientError(400, 'Missing Fields');
  }
  const sql = `
    insert into "bikeInfo" ("userId", "make", "model", "year")
    values ($1, $2, $3, $4)
    returning *
  `;
  const params = [userId, make, model, year];
  db.query(sql, params)
    .then(result => {
      const [log] = result.rows;
      res.status(201).json(log);
    })
    .catch(err => next(err));
});

app.get('/api/bikes', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select "bikeId",
           "make",
           "model",
           "year"
      from "bikeInfo"
    where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
