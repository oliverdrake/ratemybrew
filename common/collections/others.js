OffFlavours = new Mongo.Collection("off-flavours");
Beers = new Mongo.Collection("beers");
Reviews = new Mongo.Collection("reviews");
Events = new Mongo.Collection("events");


// var off_flavours = OffFlavours.find();
//
// var fields = {};
// off_flavours.forEach(function(entry) {
//   fields[entry.name] = {
//     type: Boolean,
//     optional: true
//   };
// });
// fields["beerId"] = {
//   type: String
// };
// fields["aroma"] = {
//   type: String
// };
// fields["flavour"] = {
//   type: String
// };



Reviews.attachSchema(new SimpleSchema({
  diacetyl: {
    type: Boolean,
    optional: true
  },
  acetaldehyde: {
    type: Boolean,
    optional: true
  },
  beerId: {
    type: String
  },
  beerName: {
    type: String,
    optional: true
  },
  flavour: {
    type: String
  },
  aroma: {
    type: String
  },
  submitted: {
    type: Date,
    label: "Submitted",
    autoValue: autoNow
  }
}));


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
