import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// 🛠️ Supabase setup
const supabase = createClient(
  "https://vxexigrndbgzgbnbvhtr.supabase.co",
  process.env.SUPABASE_KEY
);

// 🛠️ Express middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🛡️ Session + Passport setup
app.use(
  session({
    secret: "secret-bunny",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// 🧠 Local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { data: users, error } = await supabase
        .from("MS Forms")
        .select("*")
        .eq("username", username)
        .eq("password", password); // ⚠️ Don't store plain passwords in production

      if (error) return done(error);
      if (!users || users.length === 0)
        return done(null, false, { message: "Invalid credentials" });

      return done(null, users[0]);
    } catch (err) {
      return done(err);
    }
  })
);

// 🔐 Serialize & deserialize user
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const { data: user, error } = await supabase
    .from("MS Forms")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return done(error);
  done(null, user);
});

// 🧪 POST /login (custom handler without redirect)
// ✅ Login Route in Express Backend
app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ success: true, message: "Logged in successfully" });
});

// ✅ Auth route to check if user is logged in
app.get("/auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send("Logout failed");
    res.sendStatus(200);
  });
});



app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
