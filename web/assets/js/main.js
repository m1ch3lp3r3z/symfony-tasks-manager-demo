(function(requirejs) {
    'use strict';

    requirejs.config({
        paths: {
            'main': '../main',
            'config': '../src/config',
            'application': '../src/application',
            'routers': '../src/routers',
            'templates': '../src/templates',
            'views': '../src/views',
            'models': '../src/models',
            'collections': '../src/collections',
            'regions': '../src/regions',
            'backbone': 'backbone/backbone',
            'underscore': 'underscore/underscore',
            'jquery': 'jquery/jquery',
            'mustache': 'mustache/mustache',
            'text': 'text/text',
            'backbone.marionette': 'backbone.marionette/lib/backbone.marionette',
            'backbone.paginator': 'backbone.paginator/lib/backbone.paginator',
            'bootstrap': 'bootstrap/dist/js/bootstrap'
        },
        shim: {
            'mustache': { exports: 'Mustache' },
            'jquery': { exports: 'jQuery' },
            'underscore': { exports: '_' },
            'backbone': {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },
            'backbone.marionette': {
                deps: ['backbone']
            },
            'backbone.paginator': {
                deps: ['backbone']
            },
            'bootstrap': {
                deps: ['jquery']
            }
        }
    });

    requirejs(['application'], function(application) {
        window.application = application;
        application.start();
    });
})(requirejs);

