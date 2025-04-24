const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const mongoose = require("mongoose");
const Joi = require("joi");
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://jaervin:UVpKugVrSIWmb5wq@outdoorsc-db.6gvwghi.mongodb.net/"
  )
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("couldn't connect to mongodb", error);
  });

const reviewSchema = new mongoose.Schema({
  author: String,
  rating: Number,
  comment: String,
});

const activitySchema = new mongoose.Schema({
  name: String,
  author: String,
  location: String,
  description: String,
  length: Number,
  routeType: String,
  difficulty: String,
  activityType: String,
  pictures: [String],
  rating: Number,
  reviews: [reviewSchema],
});

const Activity = mongoose.model("Activity", activitySchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/activity-images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const validateActivity = (activity) => {
  const schema = Joi.object({
    _id: Joi.number().optional(),
    name: Joi.string().min(3).required(),
    author: Joi.string().min(3).optional(),
    location: Joi.string().min(3).required(),
    description: Joi.string().min(1).required(),
    length: Joi.number().min(0).required(),
    routeType: Joi.string()
      .valid("Loop", "Out and Back", "Point to Point")
      .required(),
    difficulty: Joi.string().valid("Easy", "Moderate", "Hard").required(),
    activityType: Joi.string()
      .valid("Hike", "Bike", "Kayak", "Walk", "Run")
      .required(),
    pictures: Joi.array().items(Joi.string()).optional(),
    rating: Joi.number().min(0).max(5).optional(),
    reviews: Joi.array()
      .items(
        Joi.object({
          author: Joi.string().min(1).required(),
          rating: Joi.number().integer().min(0).max(5).required(),
          comment: Joi.string().min(3).required(),
        })
      )
      .optional(),
  });
  return schema.validate(activity);
};

let activities = [
  {
    _id: 1,
    name: "Boardwalk Trail",
    author: "jaervin",
    location: "Congaree National Park",
    description:
      "Scenic walk through one of the most unique biospheres in the state.",
    length: 2.4,
    routeType: "Loop",
    difficulty: "Easy",
    activityType: "Hike",
    rating: 5.0,
    pictures: ["boardwalk1.jpg", "boardwalk2.jpg", "boardwalk3.jpg"],
    reviews: [
      {
        author: "AwesomeCarnival18",
        rating: 5,
        comment: "Great place! Brought my family and they loved it.",
      },
      {
        author: "TheDude2",
        rating: 5,
        comment: "Easy and simple, great outing.",
      },
      { author: "SandMan23", rating: 5, comment: "AWESOME" },
    ],
  },
  {
    _id: 2,
    name: "Table Rock Trail",
    author: "hikeguru",
    location: "Table Rock State Park",
    description:
      "A challenging trail leading to breathtaking panoramic views from Table Rock Mountain.",
    length: 7.2,
    routeType: "Out and Back",
    difficulty: "Hard",
    activityType: "Hike",
    rating: 4.8,
    pictures: ["tablerock1.jpg", "tablerock2.jpg", "tablerock3.jpg"],
    reviews: [
      {
        author: "NatureNerd45",
        rating: 5,
        comment: "Tough but rewarding! The view is stunning.",
      },
      {
        author: "MountainGoatHiker",
        rating: 4,
        comment: "Steep and challenging, but worth the effort.",
      },
      {
        author: "SCExplorer",
        rating: 5,
        comment: "One of the best hikes in the state.",
      },
    ],
  },
  {
    _id: 3,
    name: "Raven Cliff Falls Trail",
    author: "waterfallfan",
    location: "Caesars Head State Park",
    description:
      "A scenic hike to an overlook of the tallest waterfall in South Carolina.",
    length: 4.0,
    routeType: "Out and Back",
    difficulty: "Moderate",
    activityType: "Hike",
    rating: 4.5,
    pictures: ["ravencliff1.jpg", "ravencliff2.jpg", "ravencliff3.jpg"],
    reviews: [
      {
        author: "HikingLover92",
        rating: 5,
        comment: "Absolutely beautiful! The waterfall is stunning.",
      },
      {
        author: "WeekendExplorer",
        rating: 4,
        comment: "Nice hike, but the overlook can get crowded.",
      },
      {
        author: "TrailSeeker",
        rating: 4,
        comment: "Loved the trail, though wish you could get closer.",
      },
    ],
  },
  {
    _id: 4,
    name: "Foothills Trail – Laurel Valley to Sassafras Mountain",
    author: "mountainman",
    location: "Foothills Trail",
    description:
      "A tough but rewarding section leading to the highest point in South Carolina.",
    length: 14.2,
    routeType: "Point to Point",
    difficulty: "Hard",
    activityType: "Hike",
    rating: 4.9,
    pictures: ["foothills1.jpg", "foothills2.jpg", "foothills3.jpg"],
    reviews: [
      {
        author: "TrailMaster87",
        rating: 5,
        comment: "Challenging but totally worth it! Breathtaking views.",
      },
      {
        author: "AdventureGal",
        rating: 5,
        comment: "One of the best long hikes I've done in SC.",
      },
      {
        author: "BackpackerPro",
        rating: 4,
        comment: "Great experience, but not for beginners.",
      },
    ],
  },
  {
    _id: 5,
    name: "Kings Mountain National Recreation Trail",
    author: "historyhiker",
    location: "Kings Mountain National Military Park",
    description:
      "A historical loop that follows the path of Revolutionary War soldiers.",
    length: 16.0,
    routeType: "Loop",
    difficulty: "Moderate",
    activityType: "Hike",
    rating: 4.3,
    pictures: [
      "kingsmountain1.jpg",
      "kingsmountain2.jpg",
      "kingsmountain3.jpg",
    ],
    reviews: [
      {
        author: "HistoryBuff101",
        rating: 5,
        comment: "Loved the mix of history and nature.",
      },
      {
        author: "TrailRunner88",
        rating: 4,
        comment: "Nice trail for running, but some sections get muddy.",
      },
      {
        author: "WeekendExplorer",
        rating: 4,
        comment: "Long but enjoyable with cool historical sites.",
      },
    ],
  },
  {
    _id: 6,
    name: "Peachtree Rock Heritage Preserve Trail",
    author: "localwanderer",
    location: "Lexington County",
    description:
      "Easy loop showcasing sandstone formations and small waterfalls.",
    length: 1.7,
    routeType: "Loop",
    difficulty: "Easy",
    activityType: "Hike",
    rating: 4.2,
    pictures: ["peachrock1.jpg", "peachrock2.jpg", "peachrock3.jpg"],
    reviews: [
      {
        author: "QuickTrekker",
        rating: 4,
        comment: "Nice little trail for a short trip.",
      },
      {
        author: "FamilyHiker",
        rating: 4,
        comment: "Great for kids, easy and educational.",
      },
    ],
  },
  {
    _id: 7,
    name: "Croft State Park Trail System",
    author: "bikepackerSC",
    location: "Croft State Park",
    description: "Multi‑use loop through woods, streams, and a peaceful lake.",
    length: 12.0,
    routeType: "Loop",
    difficulty: "Moderate",
    activityType: "Bike",
    rating: 4.6,
    pictures: ["croft1.jpg", "croft2.jpg", "croft3.jpg"],
    reviews: [
      {
        author: "BikerBob",
        rating: 5,
        comment: "Great variety of trails and terrain.",
      },
      {
        author: "TrailMom",
        rating: 4,
        comment: "Nice loop for a longer outing without driving too far.",
      },
    ],
  },
];

// Get Activities
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//Post Activity
app.post("/api/activities", upload.single("img"), async (req, res) => {
  console.log("📥 req.file:", req.file);
  console.log("📥 req.body:", req.body);
  const result = validateActivity(req.body);

  if (result.error) {
    console.log("Error validating activity");
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const activity = new Activity({
    name: req.body.name,
    author: req.body.author,
    location: req.body.location,
    description: req.body.description,
    length: parseFloat(req.body.length),
    routeType: req.body.routeType,
    difficulty: req.body.difficulty,
    activityType: req.body.activityType,
    pictures: req.body.pictures || [],
    rating: parseFloat(req.body.rating || 0),
    reviews: req.body.reviews || [],
  });

  if (req.file) {
    console.log(req.file.filename);
    activity.pictures[0] = req.file.filename;
  }

  const newActivity = await activity.save();
  res.status(200).send(newActivity);
});

// Put / Update
app.put("/api/activities/:id", upload.single("img"), async (req, res) => {
  // Valiate request
  const { error } = validateActivity(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Fetch existing activity
  const existing = await Activity.findById(req.params.id);
  if (!existing) return res.status(404).send("Activity not found.");

  const updatedData = {
    name: req.body.name,
    author: req.body.author,
    location: req.body.location,
    description: req.body.description,
    length: parseFloat(req.body.length),
    routeType: req.body.routeType,
    difficulty: req.body.difficulty,
    activityType: req.body.activityType,
    // if pictures array sent, use it; otherwise keep what’s already in the DB
    pictures: Array.isArray(req.body.pictures)
      ? req.body.pictures
      : existing.pictures,
    // overwrite rating only if provided; otherwise keep old rating
    rating:
      req.body.rating != null ? parseFloat(req.body.rating) : existing.rating,
    reviews: Array.isArray(req.body.reviews)
      ? req.body.reviews
      : existing.reviews,
  };

  if (req.file) {
    // match exactly how you serve static files; prepend the public path
    updatedData.pictures[0] = `/images/activity-images/${req.file.filename}`;
  }

  const activity = await Activity.findByIdAndUpdate(
    req.params.id,
    updatedData,
    { new: true, runValidators: true }
  );

  res.status(200).send(activity);
});

// Delete activity
app.delete("/api/activities/:id", async (req, res) => {
  const activity = await Activity.findByIdAndDelete(req.params.id);
  res.status(200).send(activity);
});

app.get("/api/activities/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const activity = activities.find((a) => a._id === id);
  if (!activity) return res.status(404).send("Not found");
  res.send(activity);
});

app.get("/api/activities", async (req, res) => {
  const activities = await Activity.find();
  console.log(activities);
  res.send(activities);
});

app.listen(3001, () => {
  console.log("testing");
});
