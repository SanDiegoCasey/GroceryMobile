'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://standarduser:thinkful1@ds157383.mlab.com:57383/grocerymobile';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://standarduser:thinkful1@ds157853.mlab.com:57853/grocerymobile-test';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'password';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
