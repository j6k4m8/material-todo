Meteor.methods({
    '_saveTask': function(task) {
        var task = new Task(task);
        var tags = task.getTags(),
            people = task.getPeople();

        _(tags).each(function(t) {
            Tags.upsert({
                text: t.slice(1),
            }, {
                $inc: { count: 1 }
            });
        });

        _(people).each(function(t) {
            People.upsert({
                text: t.slice(1),
            }, {
                $inc: { count: 1 }
            });
        });

        Tasks.insert(task);
        return task;
    },

    'updateDetails': function(taskId, details) {
        Tasks.update(taskId, {$set: {details: details}});
    },

    'setCompleteStatus': function(taskId, complete) {
        Tasks.update(taskId, {$set: {complete: !!complete ? new Date() : undefined}});
    },

    'deleteTask': function(taskId) {
        var task = new Task(Tasks.findOne(taskId));
        var tags = task.getTags(),
            people = task.getPeople();

        _(tags).each(function(t) {
            Tags.upsert({
                text: t.slice(1),
            }, {
                $inc: { count: -1 }
            });
        });

        _(people).each(function(t) {
            People.upsert({
                text: t.slice(1),
            }, {
                $inc: { count: -1 }
            });
        });

        Tasks.remove(taskId);
    }
});
