autoNow = function() {
  if (this.isInsert) {
    return new Date;
  } else if (this.isUpsert) {
    return {$setOnInsert: new Date};
  } else {
    this.unset();
  }
};


currentUserId = function() {
  return Meteor.user()._id;
};
