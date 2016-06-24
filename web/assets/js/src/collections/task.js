define(function(require) {
    'use strict';

    var _ = require('underscore'),
        $ = require('jquery'),
        Backbone = require('backbone'),
    	Task = require('models/task'),
        Config = require('config');

    require('backbone.paginator');

    var getIntHeaderValue = function(xhr, name) {
        return parseInt(xhr.getResponseHeader(name), 10);
    };

    return Backbone.PageableCollection.extend({
        model: Task,
        url: Config.apiUrl + 'task',
        state: {
            firstPage: 1,
            currentPage: 1
        },
        parseState: function (resp, queryParams, state, options) {
            var totalPages = getIntHeaderValue(options.xhr, 'X-Pagination-Pages')

            return {
                currentPage: getIntHeaderValue(options.xhr, 'X-Pagination-Page'),
                totalPages: totalPages,
                lastPage: totalPages
                //totalRecords: options.xhr.getResponseHeader("X-total")
            };
        }
    });
});
