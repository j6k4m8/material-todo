Template.show_suggestion.events({
    'click li': function() {
        $('#new-task-text').val(
            $('#new-task-text').val().split(' ').slice(0, -1).join(' ') +
                ' ' + Session.get('suggestion_prefix') + this.text + ' '
        ).focus();
    }
})
