OffFlavours = new Mongo.Collection("off-flavours");
Beers = new Mongo.Collection("beers");
Reviews = new Mongo.Collection("reviews");


Router.map(function() {
  this.route('beers', {path: "/", layoutTemplate: 'layout'});
  this.route('review/:_id', {
    template: 'scoresheet',
    layoutTemplate: 'layout',
    data: function() { return Beers.findOne(this.params._id); }
  });
  this.route('reviews', {layoutTemplate: 'layout'});
});


if (Meteor.isClient) {

  Template.off_flavours.off_flavours = function () {
    return OffFlavours.find({});
  };

  Template.beers.beers = function () {
    return Beers.find({});
  };

  Template.reviews.reviews = function () {
    return Reviews.find({}, {sort: {submitted: "desc"}});
  }


}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {

    // Dirty Hack!!!!!
    OffFlavours.remove({});
    Beers.remove({});


    OffFlavours.insert({
        name: "acetaldehyde",
        description: "Green apple-like aroma and flavor."
    });
    OffFlavours.insert({
        name: "diacetyl",
        description: "Artificial butter, butterscotch, or toffee aroma and flavor. Sometimes perceived as a slickness on the tongue."
    });

    Beers.insert({
      name: "Oli's Porter"
    });
    Beers.insert({
      name: "Oli's Pale Ale"
    });
  });
  // /Dirty Hack


  // Meteor.methods({
  //   submitReview: function (rawData, templateData) {
  //     Mesosphere.reviewForm.validate(rawData, function(errors, formData){
  //         if(!errors){
  //           Reviews.insert({
  //             submitted: new Date(),
  //             reviewer: "Jim",
  //             beerId: formData.beerId,
  //             comments: {
  //               aroma: formData.aroma,
  //               flavour: formData.flavour,
  //             },
  //           });
  //         }else{
  //             _(errors).each( function( value, key ) {
  //               console.log(key+": "+value.message);
  //             });
  //         }
  //     });
  //   }
  // });
}
