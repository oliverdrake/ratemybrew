Reviews = new Mongo.Collection("reviews");

Schemas = {};
Schemas.SimpleReviewSchema = new SimpleSchema({
  beerId: {
    type: String
  },
  beerName: {
    type: String,
    optional: true
  },
  swapId: {
    type: String,
    optional: true
  },
  submitted: {
    type: Date,
    label: "Submitted",
    autoValue: autoNow
  },
  reviewerId: {
    type: String,
    label: "Reviewer",
    autoValue: currentUserId
  },
  comments: {
    type: String
  }
});


Reviews.attachSchema(Schemas.SimpleReviewSchema);
