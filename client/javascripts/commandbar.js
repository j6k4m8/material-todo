Template.commandbar.events({
    'keyup #commandbar': function(ev) {
        if (ev.keyCode == 13) {
            var val = ev.target.value;
            if (val == ':e') {
                Materialize.toast('Editing not yet supported...');
            }
        } else if (ev.keyCode == 27) {
            ev.target.value = '';
            ev.target.blur();
        }
    }
});
