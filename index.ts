import express from 'express';
import { auth } from './routes/auth';
import { user } from './routes/user';
import { game } from './routes/game';
import { mode } from './routes/mode';
import { keypass } from './routes/keypass';
import { User } from './model/user';
import bcrypt from 'bcrypt';
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000
const app = express()
app.listen(port, function () {
  console.log('Server is running..');
});


app.use(cors({
  origin: process.env.URL_FRONT,
  credentials: true,
}));


app.use(cookieParser());

app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', function (req, res: any) {
  res.json({ message: "hello world" });
});

User.getUserByParams({ email: process.env.USER_ADMIN_EMAIL }).then(user => {
  if (!user) {
    const passwordHash = bcrypt.hash(process.env.USER_ADMIN_PASSWORD || "Onylan", 10).then(passwordHash => {

      console.log('admin user not already exist')
      console.log('Create admin user')
      User.createUser({ name: process.env.USER_ADMIN_FIRSTNAME,
         firstName: process.env.USER_ADMIN_LASTNAME,
          email: process.env.USER_ADMIN_EMAIL,
           password: passwordHash, isAdmin: true }).then(user2 => {
        console.log(user2)
      })
    })
  }
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", user);
app.use("/game", game);
app.use("/mode", mode);
app.use("/auth", auth);
app.use("/keypass", keypass);
