Handlebars.registerHelper("prettifyDate", function(timestamp) {
    return new Date(timestamp).toDateString();
});
