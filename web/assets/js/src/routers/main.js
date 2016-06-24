define(function(require) {
    'use strict';

    var _ = require('underscore'),
        MainLayout = require('views/layout');

        require('collections/task');

    require('backbone.marionette');

    // Define and initializes self only once
    var self;

    return Backbone.Marionette.AppRouter.extend({
        routes: {
            ':model/:id': 'showModelDetail',
            ':model': 'showModelList',
            '': 'showHome'
        },
        currentView: null,
        application: null,

        initialize: function(options) {
            self = this;
            this.application = options.application;
        },

        showHome: function() {
            if (this.currentView == null || !(this.currentView instanceof MainLayout)) {
                this.currentView = new MainLayout();
            }
        },

        bindEvents: function(view) {
            this.listenTo(view, 'show:message', function() {
                self.application.execute.apply(self.application, ['showMessage'].concat(_.values(arguments)));
            });
            this.listenTo(view, 'close', function () {
                self.stopListening(view);
            });

            return view;
        },

        showModelList: function(model) {
            var collectionClass = require(['collections', model].join('/')),
                collection = new collectionClass(),
                collectionViewClass = require(['views', model, 'collection'].join('/'));

            collection.fetch().then(function() {
                self.application.contentRegion.show(
                    self.bindEvents(new collectionViewClass({ collection: collection }))
                );
            }, function(response) {
                self.application.vent.trigger('response:failed', 'test 123123');
            });
        },

        showModelDetail: function(id) {
            var task = new TaskModel(id),
                callback = function() {
                    self.application.contentRegion.show(new TaskItemView({ model: task }));
                };

            tasks.fetch().then(callback, function() {
                self.application.vent.trigger('response:failed', 'test 123123');
            });
        }

    });
});
