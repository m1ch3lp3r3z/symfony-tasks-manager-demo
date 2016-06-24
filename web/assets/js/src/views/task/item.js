define(function(require) {
    'use strict';

    var self,
        _ = require('underscore'),
        Backbone = require('backbone'),
        editTemplate = require('text!templates/task/edit.html'),
        itemTemplate = require('text!templates/task/item.html');

    require('backbone.marionette');

    return Backbone.Marionette.ItemView.extend({
        tagName: 'tr',
        attributes: function() {
            return {
                'data-id': this.model.id
            }
        },

        ui: {
            title: '[data-model="title"]',
            description: '[data-model="description"]',
            status: '[data-model="status"]',
        },

        events: {
            'click [data-action="edit-item"]': 'onEditClick',
            'click [data-action="cancel-item"]': 'onCancelClick',
            'click [data-action="save-item"]': 'onSaveClick'
        },

        templateHelpers: function() {
            return {
                statuses: _.map(['Pending', 'Done'], function(v) {
                    var lower = v.toLowerCase();
                    return {
                        label: v,
                        value: lower,
                        selected: self.model.get('status') == lower
                    }
                })
            }
        },

        getTemplate: function() {
            return this.mode == 'edit' ? editTemplate : itemTemplate;
        },

        initialize: function(options) {
            self = this;
            this.mode = options && options.mode || 'item';
        },

        onRender: function() {
            if (this.mode == 'edit') {
                this.ui.title.focus();
            }
        },

        onEditClick: function() {
            this.mode = 'edit';
            this.render();
        },

        onCancelClick: function() {
            if (this.model.hasChanged()) {
                this.model.set(this.model.previousAttributes());
            }

            this.mode = 'item';
            this.render();
        },

        onSaveClick: function() {
            this.$el.find('.form-group').removeClass('has-error').find('p').remove();

            var self = this, // For some reason global self is not working when re-rendering view
                isNew = this.model.isNew(),
                promise = this.model.save({
                title: this.ui.title.val(),
                description: this.ui.description.val(),
                status: this.ui.status.val()
            })

           if (promise) {
                promise.then(function() {
                    self.trigger('show:message', 'Task ' + (isNew && 'created' || 'updated') + ' successfully');
                    self.mode = 'item';
                    self.render(); // If we use global self won't work!!!?????
                    self.trigger('item:created');
                }, function() {
                    self.trigger('show:message', 'Oops!, something went wrong, please try again later', 'error');
                });
           } else {
                var parts = this.model.validationError.split('::'),
                   field = parts[0],
                   message = parts[1];

                // TODO: make this message a template somewhere
                this.ui[field].parent().addClass('has-error').append('<p class="text-danger">' + message  + '</p>');

                this.trigger('show:message', 'Oops!, one or more invalid values, please check', 'error');
           }
        }
    });
});
