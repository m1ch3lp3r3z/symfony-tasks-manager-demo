define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone'),
        template = require('text!templates/task/collection.html'),
        TaskModel = require('models/task'),
        TaskItemView = require('views/task/item'),
        EmptyView = require('views/empty');

    require('backbone.marionette');

    return Backbone.Marionette.CompositeView.extend({
        template: template,
        childViewContainer: 'table tbody',
        childView: TaskItemView,
        emptyView: EmptyView,
        ui: {
            previousPage: '[data-action="previous-page"]',
            nextPage: '[data-action="next-page"]',
            deleteItem: '[data-action="delete-item"]',
            createItem: '[data-action="create-item"]',
        },

        events: {
            'click @ui.previousPage': 'onPreviousPageClick',
            'click @ui.nextPage': 'onNextPageClick',
            'click @ui.deleteItem': 'onDeleteItemClick',
            'click @ui.createItem': 'onCreateItemClick',
            'click @ui.editItem': 'onEditItemClick'
        },

        childEvents: {
            'show:message': 'onChildShowMessage',
            'item:created': 'onChildCreated'
        },

        childViewOptions: function(model, index) {
            return {
                mode: model.isNew() && 'edit' || 'item',
            }
        },

        onChildCreated: function() {
            // Refresh collection
            this.collection.fetch();
        },

        // TODO: there should be another way to achieve that
        // child view event bubbles up through parent view
        onChildShowMessage: function(childView) {
            this.trigger.apply(this, ['show:message'].concat(_.values(arguments).slice(1)));
        },

        onCreateItemClick: function(event) {
            this.addChild(new TaskModel(), TaskItemView, 0);
        },

        onDeleteItemClick: function(event) {
            if (!confirm('Are you sure you want to delete this item?')) {
                return;
            }

            var self = this,
                id = Backbone.$(event.currentTarget).closest('tr').data('id'),
                model = this.collection.get(id);

            model.destroy({ wait: true }).then(function() {
                self.collection.fetch();
                self.trigger('show:message', 'Task deleted successfully');
            }, function() {
                self.trigger('show:message', 'Oops!, something went wrong, please try again later', 'error');
            });
        },

        onPreviousPageClick: function(event) {
            event.preventDefault();
            event.stopPropagation();

            if (this.collection.hasPreviousPage()) {
                this.collection.getPreviousPage();
            }
        },

        onNextPageClick: function(event) {
            event.preventDefault();
            event.stopPropagation();

            if (this.collection.hasNextPage()) {
                this.collection.getNextPage();
            }
        },
    });
});
