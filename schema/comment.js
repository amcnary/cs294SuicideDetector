"use strict";

/*
 * Defined the Mongoose Schema and return a Model for a Photo
 */

/* jshint node: true */

var mongoose = require('mongoose');

/*
 * Photo can have comments and we stored them in the Photo object itself using
 * this Schema:
 */
var commentSchema = new mongoose.Schema({
    comment: String,     // The text of the comment.
    date_time: {type: Date, default: Date.now}, // The date and time when the comment was created.
    user_id: mongoose.Schema.Types.ObjectId,    // 	The user object of the user who created the comment.
});

// the schema is useless so far
// we need to create a model using it
var CommentExport = mongoose.model('Comment', commentSchema);

// make this available to our photos in our Node applications
module.exports = CommentExport;
