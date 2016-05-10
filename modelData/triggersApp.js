"use strict";
/* jshint node: true */
/*
 * Model data for triggers Generate - the pre-bedtime trigger 
 * generating site.
 *
 */
(function() {
   // Create initial triggers.
   var trigger1 = {name: 'Coloring', seriousness: 3.0, text: 'Get out the markers, crayons and colored pencils and make a masterpiece! Find a coloring book to decorate, or draw your own creations. ',link:'http://www.coloring-pages-kids.com/',file_name: 'drawing_transparent.png', trigger_level: 'low', tag: 'creative', duration: 15, id: 1};
   var trigger2 = {name: 'Build a Town', seriousness: 3.0, text: 'Become a city planner and build your own town! Use legos, blocks, cards, boxes, or whatever materials you have around.', link:'', file_name: 'building_blocks_transparent.png', trigger_level: 'low', tag: 'creative', duration: 30, id: 2};
   var trigger3 = {name: 'Photo Storytelling', seriousness: 3.0, text: 'Get out your photo albums and tell the stories behind some of the pictures! Find the oldest photo, or a favorite memory. ', link:'',file_name: 'photo_storytelling_transparent.png', trigger_level: 'low', tag: 'creative', duration: 15, id: 3};
   var trigger4 = {name: 'The Listening Game', seriousness: 3.0, text: 'Take out several items and show them to your kids. Have the kids close their eyes as you make a sound with one of the objects, and have them guess which item made the sound!  Run your fingers along a comb, gently tap a glass, rub two blocks together, or bang on a pot. Be creative and have fun!',link:'',file_name: 'listening.jpg', trigger_level: 'low', tag: 'creative', duration: 30, id: 4};
   var trigger5 = {liked: true, name: 'Shadow Puppets', seriousness: 3.0, text: 'Use a flashlight in a dark room to create shadow puppets! Make characters with your hands or paper cutouts.', link:'https://www.youtube.com/watch?v=Kz8wP2RYy64',file_name: 'shadow_puppets_transparent.png', trigger_level: 'low', tag: 'creative', duration: 30, id: 5};
   var trigger6 = {name: 'Board Games', seriousness: 3.0,text: 'Play a board game together! Enjoy an old favorite, or find a new game to try.', link:'http://fun.familyeducation.com/slideshow/board-games/48954.html',file_name: 'board.jpg', trigger_level: 'low', tag: 'educational', duration: 30, id: 6};
   var trigger7 = {name: 'Card Games', seriousness: 3.0, text: 'Find a deck of cards and play a card game! Play one you already know, or learn the rules for a new game together.', link: 'http://www.netmums.com/triggers/free-family-fun/easy-card-games',file_name: 'card.jpg', trigger_level: 'low', tag: 'educational', duration: 30, id: 7};
   var trigger8 = {name: 'Brain Teasers', seriousness: 3.0, text: 'Challenge your brain with some brain teasers!', link:'http://www.everythingmom.com/parenting/45-riddles-and-brain-teasers-for-kids',file_name: 'brain.jpg', trigger_level: 'low', tag: 'educational', duration: 30, id: 8};
   var trigger9 = {name: 'Tickle Monster', seriousness: 3.0, text: 'Raaawwwrr! Choose one person to be the “tickle monster”, and have them chase everyone else down to try and tickle them.', link: '', file_name: 'tickle_monster_transparent.png', trigger_level: 'high', tag: 'funny', duration: 15, id: 9};
   var trigger10 = {name: 'Pillow Fight', seriousness: 3.0, text: 'Gather up a bunch of pillows from the bed or the couch, give everyone a pillow and have a pillow fight!', link: '', file_name: 'pillow_fight_transparent.png', trigger_level: 'high', tag: 'funny', duration: 15, id: 10};


   var triggers = [trigger1, trigger2, trigger3, trigger4, 
                     trigger5, trigger6, trigger7, trigger8, 
                     trigger9, trigger10];

   var triggersListModel = function() {
      return triggers;
   };


   var bedtimeModels = {
      triggersList: triggersListModel
   };

   if(typeof exports !== 'undefined') {
      exports.bedtimeModels = bedtimeModels;
   } else {
      window.bedtimeModels = bedtimeModels;
   }

})();
