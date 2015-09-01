Task = function(doc) {
    if (!doc.hasOwnProperty('complete')) {
        doc.complete = false;
    }
    _.extend(this, doc);
};

Task.prototype = {
    constructor: Task,

    // Verify that a task has requisite params:
    isValid: function() {
        return !!this.raw_text && this.hasOwnProperty('complete');
    },


    getDate: function() {
        return this.date || this.parseDate();
    },
    getTags: function() {
        return this.tags || this.parseTags();
    },
    getPeople: function() {
        return this.people || this.parsePeople();
    },


    parseDate: function() {
        var text = this.raw_text.split('//');
        if (text.length == 1) { return '' }
        var date = chrono.parseDate(text.slice(-1)[0]);
        this.date = date;
        return date;
    },

    parseTags: function() {
        var words = this.raw_text.split(' '),
            tags = _(words).filter(function(w) {
                return w.indexOf('#') == 0
            });

        this.tags = tags;
        return tags;
    },

    parsePeople: function() {
        var words = this.raw_text.split(' '),
            people = _(words).filter(function(w) {
                return w.indexOf('@') == 0
            });

        this.people = people;
        return people;
    },

    // Send the task to the database
    save: function(callback) {
        var self = this;
        if (!self.isValid()) {
            return undefined;
        }
        Meteor.call('_saveTask', self, function(err, val) {
            if (err) { console.log(err); }
            else { callback(); }
        });
        return self;
    }
};

Tasks = new Meteor.Collection('tasks', {
    transform: function(doc) {
        return new Task(doc);
    }
});

Tags = new Meteor.Collection('tags');
People = new Meteor.Collection('people');
