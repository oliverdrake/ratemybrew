CaseSwaps = new Mongo.Collection("case-swaps");

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
  participants: {
    type: [Object],
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
