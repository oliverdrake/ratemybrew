OffFlavours = new Mongo.Collection("off-flavours");
Beers = new Mongo.Collection("beers");
Reviews = new Mongo.Collection("reviews");
CaseSwaps = new Mongo.Collection("case-swaps");
Events = new Mongo.Collection("events");





autoNow = function() {
  if (this.isInsert) {
    return new Date;
  } else if (this.isUpsert) {
    return {$setOnInsert: new Date};
  } else {
    this.unset();
  }
};

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


CaseSwaps.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 100
  },
  created: {
    type: Date,
    autoValue: autoNow
  },
  creatorId: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return this.userId;
      } else if (this.isUpsert) {
        return {$setOnInsert: this.userId};
      } else {
        this.unset();
      }
    }
  },
  swapDate: {
    type: Date,
    label: "Swap date",
    optional: true
  },
  description: {
    type: String,
    label: "Description",
    optional: true
  },
  invitees: {
    type: [String],
    label: "Invitees",
    optional: true
  },
  active: {
    type: Boolean,
    label: "active",
    optional: true,
    autoValue: function() {
      if (this.isInsert) {
        return true;
      } else {
        return this.unset();
      }
    }
  }
}));


getUsersName = function(user) {
  var name = "Unknown user";
  if (user.hasOwnProperty("profile") && user.profile.hasOwnProperty("name")) {
    name = user.profile.name;
  }
  else if (user.hasOwnProperty("username")) {
    name = user.username;
  }
  return name;
}
