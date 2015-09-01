Template.list.rendered = function() {
    $('.collapsible').collapsible({
        accordion: true
    });
};

Template.list.helpers({
    tasks: function() {
        return _(Tasks.find({}).fetch()).sortBy(function(i) {
            return i.getDate();
        });
    }
});
