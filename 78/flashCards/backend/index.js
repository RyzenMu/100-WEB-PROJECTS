import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://vxexigrndbgzgbnbvhtr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4ZXhpZ3JuZGJnemdibmJ2aHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjE5NjksImV4cCI6MjA1OTQ5Nzk2OX0.hTWvkU7IRnkSG-kVJVnq6cdLK2Gn8w3nSj_IQXno-Qk"
);

dotenv.config();
const app = express();
const PORT = 3000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // frontend port
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



  // 👇 Save to DB or Supabase (mocked here)
  console.log("📝 Registered User:", { name, email });

  const { data, error } = await supabase
    .from("AITRegisteration")
    .insert([
      { name: name, email: email, password: password, confirm: confirm },
    ])
    .select();

  return res
    .status(200)
    .json({ success: true, message: "Registered successfully" });
});

//passport authentication

import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

app.use(
  session({
    secret: "your-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { 
      maxAge: 15 * 60 * 1000, // 15 min session
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());


// Passport Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // frontend should send { email, password }
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const { data: users, error } = await supabase
          .from("AITRegistration")
          .select("*")
          .eq("email", email)
          .eq("password", password); // ✅ In production use hashed passwords

        if (error) return done(error);
        if (!users || users.length === 0) {
          return done(null, false, { message: "Invalid email or password" });
        }

        return done(null, users[0]);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize & Deserialize
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const { data, error } = await supabase
    .from("hospitalUsers")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return done(error);
  done(null, data);
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
