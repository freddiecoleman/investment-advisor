/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

'use strict';

var express      = require("express"),
    errorhandler = require('errorhandler'),
    bodyParser   = require('body-parser');

/**
 * Initializes configuration.
 */
module.exports = function(app) {
  // Configure Express
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(express.static(__dirname + '/../public'));
  app.use('/bower_components',  express.static(__dirname + '/../bower_components'));

  app.use('/portraits',  express.static(__dirname + '/../data/portraits'));
  app.use('/recommendations',  express.static(__dirname + '/../data/recommendations'));

  app.set('view engine', 'jade');
  app.set('views', __dirname + '/../views');

  //Add error handling in dev
  if (!process.env.VCAP_SERVICES) {
    app.use(errorhandler());
  }
}
