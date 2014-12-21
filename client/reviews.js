Template.reviews.reviews = function () {
  return Reviews.find({}, {sort: {submitted: "desc"}});
}

Template.off_flavours.off_flavours = function () {
  return OffFlavours.find({});
};
