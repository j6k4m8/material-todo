Template.add_new_task.events({
    'keyup #new-task-text': function(ev) {
        if (ev.keyCode == 13) {
            var $el = $(ev.target),
                val = $el.val();

            if (!!val) {
                var newTask = new Task({
                    raw_text: val,
                    complete: false
                });
                newTask.save(function() {
                    $el.val('');
                });
                Session.set('suggestions', []);

            }
        } else if (ev.keyCode == 27) {
            ev.target.value = '';
            ev.target.blur();
        }

        if (ev.target.value != '') {
            var lastChunk = $('#new-task-text').val().split(' ').slice(-1)[0];
            if (lastChunk.indexOf('#') == 0) {
                Session.set('suggestions', _(Tags.find().fetch()).filter(function(i) {
                    return i.text.indexOf(lastChunk.slice(1)) == 0
                }));
                Session.set('suggestion_prefix', '#');
            } else if (lastChunk.indexOf('@') == 0) {
                Session.set('suggestions', _(People.find().fetch()).filter(function(i) {
                    return i.text.indexOf(lastChunk.slice(1)) == 0
                }));
                Session.set('suggestion_prefix', '@');
            } else {
                Session.set('suggestions', []);
            }
        } else {
            Session.set('suggestions', []);
        }
    },

    'keydown #new-task-text': function(ev) {
        if (ev.keyCode == 9) {
            ev.preventDefault();
            $('#new-task-text').val(
                $('#new-task-text').val().split(' ').slice(0, -1).join(' ') +
                    ' ' + Session.get('suggestion_prefix') + Session.get('suggestions')[0].text + ' '
            ).focus();
        }
    }
});


Template.add_new_task.helpers({
    'suggestions': function() {
        return Session.get('suggestions');
    }
});
