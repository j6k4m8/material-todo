Router.configure({
    'layoutTemplate': 'main'
});

Router.map(function() {

    this.route('home', {
        path: '/',
        template: 'home'
    });

});
