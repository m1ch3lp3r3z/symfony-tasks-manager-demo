define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        Config = require('config')

    return Backbone.Model.extend({
        url: function() {
            var url = Config.apiUrl + 'task';

            if (!this.isNew()) {
                url += '/' + this.get('id')
            }

            return url;
        },
        validate: function(attrs, options) {
            if (!attrs.title) {
                return 'title::Title cannot be empty';
            }
            if (!attrs.description) {
                return 'description::Description cannot be empty';
            }
            if (!attrs.status) {
                return 'status::Status cannot be empty';
            }
        }
    });
});
