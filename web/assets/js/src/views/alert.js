define(function(require) {
    'use strict';

    var _ = require('underscore'),
        template = require('text!templates/alert.html');

    require('backbone.marionette');
    require('bootstrap'); // TODO: try getting just alert module

    return Backbone.Marionette.ItemView.extend({
        template: template,
        className: function() {
            return ['alert', 'alert-dismissible', this.getCssClassFromType()].join(' ');
        },
        attributes: {
            role: 'alert'
        },
        events: {
            'closed.bs.alert': 'destroy'
        },

        templateHelpers: function() {
            return {
                title: this.model.get('title') || this.getTitleFromType()
            }
        },
        getTitleFromType: function() {
            return {
                error: 'Error!',
                warning: 'Warning!',
                success: 'Success!',
            }[this.model.get('type')];
        },
        getCssClassFromType: function() {
            return 'alert-' + {
                error: 'danger',
                warning: 'warning',
                success: 'success',
            }[this.model.get('type')];
        },
        onDomRefresh: function() {
            var self = this;
            this.$el.alert();

            setTimeout(function() {
                self.$el.alert('close');
            }, 5000);
        }
    });
});
