define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        Mustache = require('mustache'),
        MainRouter = require('routers/main'),
        StatusRegion = require('regions/status'),
        ContentRegion = require('regions/content'),
        AlertView = require('views/alert');

    require('backbone.marionette');

    var self,
        application = new Backbone.Marionette.Application({
        initialize: function(options) {
            // Add class to target a browser, not as standalone app.
            if(window.navigator.standalone != true) {
                $('body').addClass('no-standalone');
            }

            // Prevent internal links from causing a page refresh.
            $(document).on('click', 'a', function(event) {
                var fragment = Backbone.history.getFragment($(this).attr('href'));
                var matched = _.any(Backbone.history.handlers, function(handler) {
                    return handler.route.test(fragment);
                });
                if (matched) {
                    event.preventDefault();
                    Backbone.history.navigate(fragment, { trigger: true });
                }
            });

            // Set Mustache as the default template rendering engine.
            Marionette.Renderer.render = function(template, data) {
                return Mustache.render(
                    _.isFunction(template) && template.call(data) || template, data
                );
            };

            this.commands.setHandler('showMessage', function(message, type) {
                self.statusRegion.show(new AlertView({
                    model: new Backbone.Model({ message: message, type: type || 'success' })
                }));
            });
        },

    });

    self = application;

    application.on('start', function() {
        application.addRegions({
            statusRegion: {
                selector: '[data-region="status"]',
                regionClass: StatusRegion
            },
            contentRegion: {
                selector: '[data-region="content"]',
                regionClass: ContentRegion
            },
        });

        new MainRouter({ application: this });

        if (Backbone.history){
            Backbone.history.start();
        }
    });

    return application;
});

