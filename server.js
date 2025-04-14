const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const Joi = require("joi");
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

let activities = [
  {
    name: "Boardwalk Trail",
    _id: 1,
    author: "jaervin",
    location: "Congaree National Park",
    description:
      "Scenic walk through one of the most unique biospheres in the state.",
    length: 2.4,
    routeType: "Loop",
    difficulty: "Easy",
    rating: 5.0,
    activityType: "hike",
    reviews: [
      {
        author: "AwesomeCarnival18",
        rating: 5,
        comment:
          "Great place! brought my family and they loved it. Such a close but beautiful spot",
      },
      {
        author: "TheDude2",
        rating: 5,
        comment: "Easy and Simple, great outing",
      },
      {
        author: "SandMan23",
        rating: 5,
        comment: "AWESOME",
      },
    ],
    pictures: ["boardwalk1.jpg", "boardwalk2.jpg", "boardwalk3.jpg"],
  },
  {
    name: "Table Rock Trail",
    _id: 2,
    author: "hikeguru",
    location: "Table Rock State Park",
    description:
      "A challenging trail leading to breathtaking panoramic views from Table Rock Mountain. The steep ascent is rewarded with one of the best overlooks in South Carolina.",
    length: 7.2,
    routeType: "Out and Back",
    difficulty: "Hard",
    rating: 4.8,
    activityType: "hike",
    reviews: [
      {
        author: "NatureNerd45",
        rating: 5,
        comment:
          "Tough but rewarding! The view from the top is absolutely stunning.",
      },
      {
        author: "MountainGoatHiker",
        rating: 4,
        comment:
          "Steep and challenging, but worth the effort. Bring plenty of water!",
      },
      {
        author: "SCExplorer",
        rating: 5,
        comment: "One of the best hikes in the state. Amazing views!",
      },
    ],
    pictures: ["tablerock1.jpg", "tablerock2.jpg", "tablerock3.jpg"],
  },
  {
    name: "Raven Cliff Falls Trail",
    _id: 3,
    author: "waterfallfan",
    location: "Caesars Head State Park",
    description:
      "A scenic hike leading to an overlook of the tallest waterfall in South Carolina. A great balance between effort and reward.",
    length: 4.0,
    routeType: "Out and Back",
    difficulty: "Moderate",
    rating: 4.5,
    activityType: "hike",
    reviews: [
      {
        author: "HikingLover92",
        rating: 5,
        comment:
          "Absolutely beautiful! The waterfall is stunning, especially after rain.",
      },
      {
        author: "WeekendExplorer",
        rating: 4,
        comment: "Nice hike, but the overlook can get crowded.",
      },
      {
        author: "TrailSeeker",
        rating: 4.5,
        comment:
          "Loved the trail, though I wish you could get closer to the falls.",
      },
    ],
    pictures: ["ravencliff1.jpg", "ravencliff2.jpg", "ravencliff3.jpg"],
  },
  {
    name: "Foothills Trail - Laurel Valley to Sassafras Mountain",
    _id: 4,
    author: "mountainman",
    location: "Foothills Trail",
    description:
      "A tough but rewarding section of the Foothills Trail, leading to the highest point in South Carolina with incredible views.",
    length: 14.2,
    routeType: "Point to Point",
    difficulty: "Hard",
    rating: 4.9,
    activityType: "hike",
    reviews: [
      {
        author: "TrailMaster87",
        rating: 5,
        comment:
          "Challenging but totally worth it! Sassafras Mountain is breathtaking.",
      },
      {
        author: "AdventureGal",
        rating: 5,
        comment:
          "One of the best long hikes I've done in SC. Lots of variety in the terrain!",
      },
      {
        author: "BackpackerPro",
        rating: 4.5,
        comment:
          "Great experience, but definitely not for beginners. Be prepared!",
      },
    ],
    pictures: ["foothills1.jpg", "foothills2.jpg", "foothills3.jpg"],
  },
  {
    name: "Kings Mountain National Recreation Trail",
    _id: 5,
    author: "historyhiker",
    location: "Kings Mountain National Military Park",
    description:
      "A historical trail that follows the path of Revolutionary War soldiers, featuring rolling terrain and informative markers along the way.",
    length: 16.0,
    routeType: "Loop",
    difficulty: "Moderate",
    rating: 4.3,
    activityType: "hike",
    reviews: [
      {
        author: "HistoryBuff101",
        rating: 5,
        comment:
          "Loved the mix of history and nature. Great interpretive signs!",
      },
      {
        author: "TrailRunner88",
        rating: 4,
        comment: "Nice trail for running, but some sections can get muddy.",
      },
      {
        author: "WeekendExplorer",
        rating: 4.5,
        comment: "A long but enjoyable hike with some cool historical sites.",
      },
    ],
    pictures: [
      "kingsmountain1.jpg",
      "kingsmountain2.jpg",
      "kingsmountain3.jpg",
    ],
  },
  {
    name: "Peachtree Rock Heritage Preserve Trail",
    _id: 6,
    author: "localwanderer",
    location: "Lexington County",
    description:
      "An easy trail that showcases sandstone formations and small waterfalls. Great for a quick escape into nature.",
    length: 1.7,
    routeType: "Loop",
    difficulty: "Easy",
    rating: 4.2,
    activityType: "hike",
    reviews: [
      {
        author: "QuickTrekker",
        rating: 4,
        comment:
          "Nice little trail for a short trip. Interesting rock formations!",
      },
      {
        author: "FamilyHiker",
        rating: 4.5,
        comment: "Great for kids, easy and educational.",
      },
    ],
    pictures: ["peachrock1.jpg", "peachrock2.jpg", "peachrock3.jpg"],
  },
  {
    name: "Croft State Park Trail System",
    _id: 7,
    author: "bikepackerSC",
    location: "Croft State Park",
    description:
      "A multi-use trail system ideal for hiking, biking, and horseback riding. Features dense woods, streams, and a peaceful lake.",
    length: 12.0,
    routeType: "Loop",
    difficulty: "Moderate",
    rating: 4.6,
    activityType: "hike",
    reviews: [
      {
        author: "BikerBob",
        rating: 5,
        comment: "Great variety of trails and terrain. Well-maintained.",
      },
      {
        author: "TrailMom",
        rating: 4.5,
        comment: "Nice loop for a longer outing without driving too far.",
      },
    ],
    pictures: ["croft1.jpg", "croft2.jpg", "croft3.jpg"],
  },
];

app.get("/api/activities", (req, res) => {
  res.send(activities);
});

app.post("/api/activities", upload.single("img"), (req, res) => {
  const result = validateActivity(req.body);

  if (result.error) {
    console.log("Post Error");
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const activity = {
    _id: activities.length,
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
    length: req.body.length,
    routeType: req.body.routeType,
    difficulty: req.body.difficulty,
    rating: req.body.rating,
    activityType: req.body.activityType,
    pictures: JSON.parse(req.body.pictures || "[]"),
  };

  activities.push(activity);
  res.status(200).send(activity);
});

const validateActivity = (activity) => {
  const schema = Joi.object({
    _id: Joi.allow(""),
    name: Joi.string().min(3).required(),
    location: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    length: Joi.number().min(0.1).required(),
    routeType: Joi.string()
      .valid("Loop", "Out and Back", "Point to Point", "Other")
      .required(),
    difficulty: Joi.string().valid("Easy", "Moderate", "Hard").required(),
    activityType: Joi.string()
      .valid("Hike", "Bike", "Kayak", "Run", "Walk")
      .required(),
    pictures: Joi.array().items(Joi.string().min(3))
  });

  return schema.validate(activity);
};

app.listen(3001, () => {
  console.log("testing");
});
