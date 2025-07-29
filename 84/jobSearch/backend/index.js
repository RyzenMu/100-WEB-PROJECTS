// server.js
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcrypt");
const { createClient } = require("@supabase/supabase-js");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const { data: users, error } = await supabase
          .from("jobPortal")
          .select("*")
          .eq("email", email)
          .single();

        if (error || !users) {
          return done(null, false, { message: "Invalid email or password" });
        }

        const isValidPassword = await bcrypt.compare(password, users.password);
        if (!isValidPassword) {
          return done(null, false, { message: "Invalid email or password" });
        }

        return done(null, users);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { data: user, error } = await supabase
      .from("jobPortal")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return done(error);
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Web Scraping Functions
async function scrapeIndeedJobs() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto("https://www.indeed.com/jobs?q=software+developer&l=", {
      waitUntil: "networkidle2",
    });

    const jobs = await page.evaluate(() => {
      const jobElements = document.querySelectorAll("[data-result-id]");
      const jobsData = [];

      jobElements.forEach((element, index) => {
        if (index < 10) {
          // Limit to 10 jobs
          const title =
            element.querySelector("h2 a span")?.textContent?.trim() || "N/A";
          const company =
            element
              .querySelector('[data-testid="company-name"]')
              ?.textContent?.trim() || "N/A";
          const location =
            element
              .querySelector('[data-testid="job-location"]')
              ?.textContent?.trim() || "N/A";
          const summary =
            element
              .querySelector('[data-testid="job-snippet"]')
              ?.textContent?.trim() || "N/A";

          jobsData.push({
            title,
            company,
            location,
            summary,
            source: "Indeed",
            requiredTechnologies: extractTechnologies(title + " " + summary),
            experience: extractExperience(summary),
            salary: "Not specified",
          });
        }
      });

      return jobsData;
    });

    await browser.close();
    return jobs;
  } catch (error) {
    console.error("Error scraping Indeed:", error);
    await browser.close();
    return [];
  }
}

async function scrapeLinkedInJobs() {
  // Note: LinkedIn has strict anti-scraping measures
  // This is a simplified example - in production, use LinkedIn API
  const mockJobs = [
    {
      title: "Frontend Developer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      summary:
        "Looking for a React developer with 2-3 years experience in JavaScript, HTML, CSS",
      source: "LinkedIn",
      requiredTechnologies: "React, JavaScript, HTML, CSS",
      experience: "2-3 years",
      salary: "$80k - $120k",
    },
    {
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "New York, NY",
      summary:
        "Full stack position requiring Node.js, React, MongoDB experience. 3+ years required.",
      source: "LinkedIn",
      requiredTechnologies: "Node.js, React, MongoDB",
      experience: "3+ years",
      salary: "$90k - $140k",
    },
  ];

  return mockJobs;
}

async function scrapeNaukriJobs() {
  // Note: Naukri has anti-scraping measures
  // This is a simplified example - consider using their API if available
  const mockJobs = [
    {
      title: "Software Engineer",
      company: "Indian Tech Solutions",
      location: "Bangalore, India",
      summary:
        "Java, Spring Boot, microservices experience required. 2-4 years experience.",
      source: "Naukri",
      requiredTechnologies: "Java, Spring Boot, Microservices",
      experience: "2-4 years",
      salary: "₹8-15 LPA",
    },
    {
      title: "Python Developer",
      company: "Data Analytics Corp",
      location: "Hyderabad, India",
      summary:
        "Python, Django, PostgreSQL expertise needed. Fresh to 2 years experience.",
      source: "Naukri",
      requiredTechnologies: "Python, Django, PostgreSQL",
      experience: "0-2 years",
      salary: "₹5-12 LPA",
    },
  ];

  return mockJobs;
}

function extractTechnologies(text) {
  const techKeywords = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "C++",
    "C#",
    "PHP",
    "Angular",
    "Vue.js",
    "HTML",
    "CSS",
    "SQL",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Git",
    "TypeScript",
    "Spring Boot",
    "Django",
    "Flask",
    "Express",
    "MySQL",
    "Redis",
    "GraphQL",
    "REST API",
  ];

  const foundTech = techKeywords.filter((tech) =>
    text.toLowerCase().includes(tech.toLowerCase())
  );

  return foundTech.join(", ") || "General IT";
}

function extractExperience(text) {
  const expMatch = text.match(/(\d+)[\s-]*(\d*)\s*(year|yr|experience)/i);
  if (expMatch) {
    const min = expMatch[1];
    const max = expMatch[2] || min;
    return `${min}${max !== min ? "-" + max : "+"} years`;
  }
  return "Not specified";
}

// Routes
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("jobPortal")
      .select("email")
      .eq("email", email)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const { data, error } = await supabase
      .from("jobPortal")
      .insert([{ name, email, password: hashedPassword }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ message: "Error creating user" });
    }

    res
      .status(201)
      .json({
        message: "User created successfully",
        user: { id: data.id, name: data.name, email: data.email },
      });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login error" });
      }
      return res.json({
        message: "Login successful",
        user: { id: user.id, name: user.name, email: user.email },
      });
    });
  })(req, res, next);
});

app.post("/api/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout error" });
    }
    res.json({ message: "Logout successful" });
  });
});

app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      user: { id: req.user.id, name: req.user.name, email: req.user.email },
    });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

app.get("/api/jobs", async (req, res) => {
  try {
    // Scrape jobs from different sources
    const [indeedJobs, linkedinJobs, naukriJobs] = await Promise.all([
      scrapeIndeedJobs(),
      scrapeLinkedInJobs(),
      scrapeNaukriJobs(),
    ]);

    const allJobs = [...indeedJobs, ...linkedinJobs, ...naukriJobs];

    // Store jobs in database
    if (allJobs.length > 0) {
      // Clear existing jobs (optional - you might want to keep historical data)
      await supabase.from("itJobs").delete().neq("id", 0);

      // Insert new jobs
      const { error } = await supabase.from("itJobs").insert(
        allJobs.map((job) => ({
          title: job.title,
          company: job.company,
          location: job.location,
          summary: job.summary,
          source: job.source,
          requiredTechnologies: job.requiredTechnologies,
          experience: job.experience,
          salary: job.salary,
        }))
      );

      if (error) {
        console.error("Error storing jobs:", error);
      }
    }

    res.json({ jobs: allJobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

app.get("/api/jobs/stored", async (req, res) => {
  try {
    const { data: jobs, error } = await supabase
      .from("itJobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({ message: "Error fetching stored jobs" });
    }

    res.json({ jobs });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
