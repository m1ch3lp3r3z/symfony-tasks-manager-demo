define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone'),
        Mustache = require('mustache'),
        template = require('text!templates/home.html'),
        TasksView = require('views/task/collection');

    require('backbone.marionette');

    return Backbone.Marionette.LayoutView.extend({
        template: Mustache.parse(template),
        collectionView: null,

        regions: {
            shows: '#postercollection'
        },

        ui: {
            pageNum: '#pagenum .value',
            nextPage: '#navcontrols #navright',
            prevPage: '#navcontrols #navleft',
            carousel: '#postercollection'
        },

        events: {
            'click #navleft': '_onNavLeftClick',
            'click #navright': '_onNavRightClick',
            'click #navicons #navicondetails': '_onNavIconDetailsClick',
            'click #navicons #naviconthumbs': '_onNavIconDetailsClick'
        },

        initialize: function(options) {
            _.bindAll(this, '_onCollectionViewRender');
        },

        _onCollectionViewRender: function() {
            if(this.collectionView.collection.length == 0) {
                this.currentPage = 0;
                this.totalPages = 0;
            } else {

            }
            this._onCarouselSlid();
            this._updatePrevNext();
            this.$('#navcontrols').css('display', this.totalPages == 0 ? 'none' : 'block');
            this.delegateEvents();
        },
    });
});
