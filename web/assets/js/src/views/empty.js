define(function(require) {
    'use strict';

    var template = require('text!templates/empty.html');

    require('backbone.marionette');

    return Backbone.Marionette.ItemView.extend({
        tagName: 'tr',
        template: template
    });
});
