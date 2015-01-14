OffFlavours = new Mongo.Collection("off-flavours");
Beers = new Mongo.Collection("beers");
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


Beers.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 200
  },
  description: {
    type: String,
    label: "Description"
  },
  userId: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return Meteor.userId();
      } else if (this.isUpsert) {
        return {$setOnInsert: Meteor.userId()};
      } else {
        this.unset();
      }
    }
  }
}));
