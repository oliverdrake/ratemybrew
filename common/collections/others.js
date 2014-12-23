OffFlavours = new Mongo.Collection("off-flavours");
Beers = new Mongo.Collection("beers");
Reviews = new Mongo.Collection("reviews");
Events = new Mongo.Collection("events");


Events.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  body: {
    type: String,
    label: "Body"
  },
  created: {
    type: Date,
    label: "Created",
    autoValue: autoNow
  }
}));


OffFlavours.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 100,
  },
  description: {
    type: String,
    label: "Description",
    max: 1000,
    optional: true
  }
}));
