import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

const supabase = createClient(
  "https://vxexigrndbgzgbnbvhtr.supabase.co",
  process.env.SUPABASE_KEY
);

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "hospital-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 60 * 1000, // 15 min session expiry
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // use 'email' instead of 'username' if your frontend sends 'email'
      passwordField: "password",
    },
    async (email, password, done) => {
      const { data: users, error } = await supabase
        .from("hospitalUsers")
        .select("*")
        .eq("email", email)
        .eq("password", password); // insecure; just for development

      console.log("users", users);

      if (error) return done(error);
      if (!users || users.length === 0)
        return done(null, false, { message: "Invalid credentials" });

      return done(null, users[0]);
    }
  )
);

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

// Routes

app.post("/register", async (req, res) => {
  console.log("Incoming data:", req.body); // Add this

  const { name, email, password, phone, dob } = req.body;
  const { data, error } = await supabase
    .from("hospitalUsers")
    .insert([{ name, email, password, phone, dob }])
    .select(); // you can temporarily remove .select() if needed

  if (error) {
    console.error("Supabase error:", error); // Add this
    return res.status(400).json({ error: error.message });
  }

  res.json({ success: true, user: data[0] });
});

app.post("/login", (req, res, next) => {
  console.log("Login attempt:", req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    console.log(user);

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.json({ success: true, user });
    });
  })(req, res, next);
});

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.json({ success: true });
  });
});

app.post("/patient-info", async (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).json({ error: "Unauthorized" });

  const { user_id, ...fields } = req.body;
  const { error } = await supabase
    .from("patient_info")
    .insert([{ user_id, ...fields }]);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

app.get("/patient-info", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  return res.json({ success: true, user: req.user });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
