Template.show_task.helpers({
    display_text: function() {
        var text = this.raw_text.split('//').length -1 ? this.raw_text.split('//').slice(0, -1).join(' ') : this.raw_text;
        var words = text.split(' ');
        var display = [];
        _(words).each(function(i) {
            if (i.indexOf('#') == 0) {
                temp_word = '<span class="inline-tag">' + i.slice(1) + '</span>';
            } else if (i.indexOf('@') == 0) {
                temp_word = '<span class="inline-person">' + i.slice(1) + '</span>';
            } else {
                temp_word = i;
            }

            display.push(temp_word);
        });

        return display.join(' ');
    },

    display_date: function() {
        var d = this.getDate();
        return d ? moment(d).calendar() : '';
    },

    complete_icon_name: function() {
        return !!this.complete ? 'check_box' : 'check_box_outline_blank';
    },

    is_complete_yn: function() {
        return !!this.complete ? 'y' : 'n';
    }
});

Template.show_task.events({
    'click .complete-icon': function(ev) {
        Meteor.call('setCompleteStatus', this._id, !this.complete);
    }
});
