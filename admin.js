AdminConfig = {
  adminEmails: ['oliver@drake.ch'],
  collections: {
    Beers: {auxCollections: []},
    Reviews: {auxCollections: []},
    CaseSwaps: {auxCollections: []},
    OffFlavours: {
      auxCollections: [],
      templates: {
        new: "insertOffFlavourForm",
      }
    },
    Users: {auxCollections: []}
  }
};
