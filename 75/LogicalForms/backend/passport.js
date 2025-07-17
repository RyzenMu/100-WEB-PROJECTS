import passport from "passport";
import session from "express-session";
import pkg from "passport-local";
import express from "express";
import { supabase } from "./supabase.js";

const LocalStrategy = pkg.Strategy;

const app = express();
let users = [];

app.use(
  session({
    secret: "bunny failure",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

async function getUsers() {
  let { data: users1, error } = await supabase.from("MS Forms").select("*");
  if (error) throw new Error(error);
  users = users1
}
getUsers()


//local strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find(u => u.username === username);
    if(!user) return done(null, false, {message: 'incorrect user name'})
    if(user.password !== password)  return done(null, false, {message: 'Incorrect password'})
    return done(null, user)  
  })
);

// serialize and de-seralize user
passport.serializeUser((user, done)=>{
  done(null, user.id)
})

passport.deserializeUser((id, done)=>{
  const user = users.find(u => u.id === id);
  done(null, user)
})
