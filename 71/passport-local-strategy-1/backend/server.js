import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import cors from 'cors'
import getUsers from './supabase.js'
import dotenv from 'dotenv'
dotenv.config();

const app = express();

let users = []
getUsers().then(fetchedUsers => users = fetchedUsers)

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())
app.use(
  session({
    secret: "cocount",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// passport local strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find((u) => u.username === username);
    if (!user)
      return done(null, false, {
        message: "No user found",
      });
    if (user.password !== password)
      return done(null, false, {
        message: "wrong password",
      });
    return done(null, user);
  })
);

// Serialize / Deserialize
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done (null, user);
})

//Routes
app.get('/api', (req, res) => {
    res.send(
    `<h2>Welcome</h2><form method="POST" action='http://localhost:3000/api'>
    <input name="username" placeholder="username" />
    <input name="password" type="password" placeholder="password" />
    <button type="submit">Login</buttton>
    </form>`
    )
})

app.post('/api', passport.authenticate("local" , {
  successRedirect: 'http://localhost:5173/signup',
  failureRedirect: "/api"
}))

app.listen(3000, ()=> console.log("server running on port 3000"))
