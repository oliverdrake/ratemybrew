// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

// Players = new Mongo.Collection("players");
OffFlavours = new Mongo.Collection("off-flavours");
Beers = new Mongo.Collection("beers");
Reviews = new Mongo.Collection("reviews");

Mesosphere({
  name:"reviewForm",
  method:"submitReview",
  template:"scoresheet",
  fields:{
    beerId:{
      required:true,
    },
    aroma:{
      required:true,
      message:"Aroma",
      rules:{
          minLength:1
      }
    },
    flavour:{
      required:true,
      message:"Flavour",
      rules:{
          minLength:1
      }
    }
  },
  onFailure: function(erroredFields, formHandle){
     Mesosphere.Utils.failureCallback(erroredFields, formHandle);
  }
});





if (Meteor.isClient) {

  Template.off_flavours.off_flavours = function () {
    return OffFlavours.find({});
  };

  Template.beers.beers = function () {
    return Beers.find({});
  };

  Template.beers.events({
    'click .beer': function () {
      Session.set("selected_beer", this._id);
    }
  });

  Template.scoresheet.beer = function () {
    return Beers.findOne({_id: Session.get("selected_beer")});
  };

  Template.scoresheet.events({
    'click .submit-review': function () {

      beer = Beers.findOne({_id: Session.get("selected_beer")});
      console.log(beer);

    }
  });
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


  Meteor.methods({
    submitReview: function (rawData, templateData) {
      Mesosphere.reviewForm.validate(rawData, function(errors, formData){
          if(!errors){
            Reviews.insert({
              submitted: new Date(),
              reviewer: "Jim",
              beerId: formData.beerId,
              comments: {
                aroma: formData.aroma,
                flavour: formData.flavour,
              },
            });
          }else{
              _(errors).each( function( value, key ) {
                console.log(key+": "+value.message);
              });
          }
      });
    }
  });
}
