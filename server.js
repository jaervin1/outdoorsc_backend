const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname+"/index.html");
});

let activities = [
  {
    "name": "Boardwalk Trail",
    "_id": 1,
    "author": "jaervin",
    "location": "Congaree National Park",
    "description": " Scenic walk through one of the most unique biospheres in the state.",
    "length": 2.4,
    "type": "Loop",
    "difficulty": "EASY",
    "rating": 5,
    "activityType": "hike",
    "reviews": [
      {
        "author": "AwesomeCarnival18",
        "rating": 5,
        "comment": "Great place! brought my family and they loved it. Such a close but beautiful spot"
      },
      {
        "author": "TheDude2",
        "rating": 5,
        "comment": "Easy and Simple, great outing"
      },
      {
        "author": "SandMan23",
        "rating": 5,
        "comment": "AWESOME"
      }
    ],
    "pictures": [
      "images/trail-one.jpg",
      "images/image2.jpg",
      "images/image3.jpg"
    ]
  },
  {
    "name": "Table Rock Trail",
    "_id": 2,
    "author": "hikeguru",
    "location": "Table Rock State Park",
    "description": "A challenging trail leading to breathtaking panoramic views from Table Rock Mountain. The steep ascent is rewarded with one of the best overlooks in South Carolina.",
    "length": 7.2,
    "type": "Out and Back",
    "difficulty": "HARD",
    "rating": 4.8,
    "reviews": [
      {
        "author": "NatureNerd45",
        "rating": 5,
        "comment": "Tough but rewarding! The view from the top is absolutely stunning."
      },
      {
        "author": "MountainGoatHiker",
        "rating": 4,
        "comment": "Steep and challenging, but worth the effort. Bring plenty of water!"
      },
      {
        "author": "SCExplorer",
        "rating": 5,
        "comment": "One of the best hikes in the state. Amazing views!"
      }
    ],
    "pictures": [
      "images/trail-two.jpg",
      "images/image2.jpg",
      "images/image3.jpg"
    ]
  },
  {
    "name": "Raven Cliff Falls Trail",
    "_id": 3,
    "author": "waterfallfan",
    "location": "Caesars Head State Park",
    "description": "A scenic hike leading to an overlook of the tallest waterfall in South Carolina. A great balance between effort and reward.",
    "length": 4.0,
    "type": "Out & Back",
    "difficulty": "MODERATE",
    "rating": 3.0,
    "reviews": [
      {
        "author": "HikingLover92",
        "rating": 5,
        "comment": "Absolutely beautiful! The waterfall is stunning, especially after rain."
      },
      {
        "author": "WeekendExplorer",
        "rating": 4,
        "comment": "Nice hike, but the overlook can get crowded."
      },
      {
        "author": "TrailSeeker",
        "rating": 4.5,
        "comment": "Loved the trail, though I wish you could get closer to the falls."
      }
    ],
    "pictures": [
      "images/trail-two.jpg",
      "images/ravencliff2.jpg",
      "images/ravencliff3.jpg"
    ]
  },
  {
    "name": "Foothills Trail - Laurel Valley to Sassafras Mountain",
    "_id": 4,
    "author": "mountainman",
    "location": "Foothills Trail",
    "description": "A tough but rewarding section of the Foothills Trail, leading to the highest point in South Carolina with incredible views.",
    "length": 14.2,
    "type": "Point to Point",
    "difficulty": "HARD",
    "rating": 4.9,
    "reviews": [
      {
        "author": "TrailMaster87",
        "rating": 5,
        "comment": "Challenging but totally worth it! Sassafras Mountain is breathtaking."
      },
      {
        "author": "AdventureGal",
        "rating": 5,
        "comment": "One of the best long hikes I've done in SC. Lots of variety in the terrain!"
      },
      {
        "author": "BackpackerPro",
        "rating": 4.5,
        "comment": "Great experience, but definitely not for beginners. Be prepared!"
      }
    ],
    "pictures": [
      "images/trail-three.jpg",
      "images/sassafras-mountain.jpg",
      "images/valley-view.jpg"
    ]
  },
  {
    "name": "Kings Mountain National Recreation Trail",
    "_id": 5,
    "author": "historyhiker",
    "location": "Kings Mountain National Military Park",
    "description": "A historical trail that follows the path of Revolutionary War soldiers, featuring rolling terrain and informative markers along the way.",
    "length": 16.0,
    "type": "Loop",
    "difficulty": "MODERATE",
    "rating": 4.3,
    "reviews": [
      {
        "author": "HistoryBuff101",
        "rating": 5,
        "comment": "Loved the mix of history and nature. Great interpretive signs!"
      },
      {
        "author": "TrailRunner88",
        "rating": 4,
        "comment": "Nice trail for running, but some sections can get muddy."
      },
      {
        "author": "WeekendExplorer",
        "rating": 4.5,
        "comment": "A long but enjoyable hike with some cool historical sites."
      }
    ],
    "pictures": [
      "images/trail-four.jpg",
      "images/trail-sign.jpg",
      "images/historical-marker.jpg"
    ]
  }
];

app.get("/api/activities", (req, res) => {
  res.send(activities);
});

app.listen(3001, () => {
  console.log("testing");
});