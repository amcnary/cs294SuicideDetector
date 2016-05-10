"use strict";
/* jshint node: true */
/*
 * Model data for Activities Generate - the pre-bedtime activity 
 * generating site.
 * This module returns an object called activities with the following functions:
 *
 * TODO: Fill in with actual data
 * cs142Models.userListModel - A function that returns the list of users on the system. The
 * list is returned as an array of objects containing:
 *   id  (number) - The ID of the user.
 *   first_name (string) - The first name of the user.
 *   last_name (string) - The last name of the user.
 *   location (string) - The location of the user.
 *   description (string) - A brief user description.
 *   occupation (string) - The occupation of the user.
 *
 */
(function() {
   // Create initial activities.
   var activity1 = {liked: false, name: 'Coloring', rating: 3.0, description: 'Get out the markers, crayons and colored pencils and make a masterpiece! Find a coloring book to decorate, or draw your own creations. ',link:'http://www.coloring-pages-kids.com/',file_name: 'drawing_transparent.png', activity_level: 'low', tag: 'creative', duration: 15, id: 1};
   var activity2 = {liked: false, name: 'Build a Town', rating: 3.0, description: 'Become a city planner and build your own town! Use legos, blocks, cards, boxes, or whatever materials you have around.', link:'', file_name: 'building_blocks_transparent.png', activity_level: 'low', tag: 'creative', duration: 30, id: 2};
   var activity3 = {liked: false, name: 'Photo Storytelling', rating: 3.0, description: 'Get out your photo albums and tell the stories behind some of the pictures! Find the oldest photo, or a favorite memory. ', link:'',file_name: 'photo_storytelling_transparent.png', activity_level: 'low', tag: 'creative', duration: 15, id: 3};
   var activity4 = {liked: false, name: 'The Listening Game', rating: 3.0, description: 'Take out several items and show them to your kids. Have the kids close their eyes as you make a sound with one of the objects, and have them guess which item made the sound!  Run your fingers along a comb, gently tap a glass, rub two blocks together, or bang on a pot. Be creative and have fun!',link:'',file_name: 'listening.jpg', activity_level: 'low', tag: 'creative', duration: 30, id: 4};
   var activity5 = {liked: true, name: 'Shadow Puppets', rating: 3.0, description: 'Use a flashlight in a dark room to create shadow puppets! Make characters with your hands or paper cutouts.', link:'https://www.youtube.com/watch?v=Kz8wP2RYy64',file_name: 'shadow_puppets_transparent.png', activity_level: 'low', tag: 'creative', duration: 30, id: 5};
   var activity6 = {liked: false, name: 'Board Games', rating: 3.0,description: 'Play a board game together! Enjoy an old favorite, or find a new game to try.', link:'http://fun.familyeducation.com/slideshow/board-games/48954.html',file_name: 'board.jpg', activity_level: 'low', tag: 'educational', duration: 30, id: 6};
   var activity7 = {liked: false, name: 'Card Games', rating: 3.0, description: 'Find a deck of cards and play a card game! Play one you already know, or learn the rules for a new game together.', link: 'http://www.netmums.com/activities/free-family-fun/easy-card-games',file_name: 'card.jpg', activity_level: 'low', tag: 'educational', duration: 30, id: 7};
   var activity8 = {liked: false, name: 'Brain Teasers', rating: 3.0, description: 'Challenge your brain with some brain teasers!', link:'http://www.everythingmom.com/parenting/45-riddles-and-brain-teasers-for-kids',file_name: 'brain.jpg', activity_level: 'low', tag: 'educational', duration: 30, id: 8};
   var activity9 = {liked: false, name: 'Tickle Monster', rating: 3.0, description: 'Raaawwwrr! Choose one person to be the “tickle monster”, and have them chase everyone else down to try and tickle them.', link: '', file_name: 'tickle_monster_transparent.png', activity_level: 'high', tag: 'funny', duration: 15, id: 9};
   var activity10 = {liked: false, name: 'Pillow Fight', rating: 3.0, description: 'Gather up a bunch of pillows from the bed or the couch, give everyone a pillow and have a pillow fight!', link: '', file_name: 'pillow_fight_transparent.png', activity_level: 'high', tag: 'funny', duration: 15, id: 10};
   var activity11 = {liked: false, name: 'Furniture Hot Lava Monster',description:'The floor is made of hot lava! Move from one piece of furniture to the next without falling to the ground. You’re out if you touch the floor!',link:'', rating: 3.0, file_name: 'Hot_Lava.jpg', activity_level: 'high', tag: 'funny', duration: 15, id: 11};
   var activity12 = {liked: false, name: 'Hot Potato', description:'Sit on the floor in a circle and turn on some music. Pass a “potato” around the circle as fast as you can. When the music stops, the player holding the potato is out! Keep going until only one player is left and wins the game.', link:'', rating: 3.0, file_name: 'potato.jpg', activity_level: 'low', tag: 'funny', duration: 15, id: 12};
   var activity13 = {liked: false, name: 'Dance Party', rating: 3.0, description:'Turn on your favorite tunes and show off your dance moves!',link:'',file_name: 'dance_party_transparent.png', activity_level: 'high', tag: 'musical', duration: 30, id: 13};
   var activity14 = {liked: false, name: 'Freeze!', rating: 3.0, description:'Choose some of your kids’ favourite tunes and turn up the volume. Ask them to dance until the music stops. When it does, they have to freeze in whatever position they find themselves in – even if they have one leg up.',link:'', file_name: 'freeze_new.jpg', activity_level: 'high', tag: 'musical', duration: 15, id: 14};
   var activity15 = {liked: false, name: 'Music Making', rating: 3.0, description: 'It\'s music time! Pick a favorite song and sing it together, or make up your own song. Bonus points for using instruments or making your own! ', link: '',file_name: 'singing_transparent.png', activity_level: 'low', tag: 'musical', duration: 15, id: 15};
   var activity16 = {liked: false, name: 'Stargazing', rating: 3.0, description: 'Find a dark spot outside and look at the stars! Find your favorite constellations, or make up your own.', link: 'http://www.skyandtelescope.com/astronomy-resources/stargazing-basics/family-projects-and-experiments/',file_name: 'stargazing_transparent.png', activity_level: 'low', tag: 'outdoors', duration: 30, id: 16};
   var activity17 = {liked: true, name: 'Night Walk', description:'Go outside at night and take a walk around the neighborhood! What can you find on your evening adventure?',link:'',rating: 3.0, file_name: 'night_walk_transparent.png', activity_level: 'high', tag: 'outdoors', duration: 30, id: 17};
   var activity18 = {liked: false, name: 'Hide & Seek', description:'Choose one person to be the "seeker", and have them close their eyes and count to 100 while the other players hide. The seeker then opens their eyes and tries to find the hiders; the first one found is the next seeker, and the last is the winner of the round.',link:'',rating: 3.0, file_name: 'hide_and_seek_transparent.png', activity_level: 'low', tag: 'physical', duration: 30, id: 18};
   var activity19 = {liked: false, name: 'Family Workout', description:'Get moving! Grab a jumprope, hop on the trampoline, jump in the pool or go on a bike ride!',link:'',rating: 3.0, file_name: 'work_out.jpg', activity_level: 'high', tag: 'physical', duration: 15, id: 19};
   var activity20 = {liked: false, name: 'Yoga', description:'Calm your body and mind by trying out some yoga poses. Stretch your muscles and breathe deeply.',link:'http://www.parents.com/fun/activities/indoor/yoga-for-kids/#page=1',rating: 3.0, file_name: 'yoga_transparent.png', activity_level: 'low', tag: 'physical', duration: 15, id: 20};
   var activity21 = {liked: false, name: 'DIY Balance Beam', description:'Use some tape to make a "balance beam" line on the ground. Kids can take their turn walking one-foot-over-the-other across the straight line of tape. Increase the challenge by walking backwards or balancing with one foot on the line!',link:'',rating: 3.0, file_name: 'Balance_Beam.png', activity_level: 'low', tag: 'physical', duration: 15, id: 21};
   var activity22 = {liked: false, name: 'Gymnastics', description:'Find an area with soft ground and show off your gymnastics skills! Make a show out of somersaults, cartwheels and handstands!',link:'',rating: 3.0, file_name: 'gymnastics.png', activity_level: 'high', tag: 'physical', duration: 15, id: 22};
   var activity23 = {liked: false, name: 'Indoor Hopscotch', description: 'Make a hopscotch game with chalk or tape on the ground, and show off your hopping skills! Challenge other players by throwing a coin into a square and having them hop on one foot on every square up to the coin.',link:'',rating: 3.0, file_name: 'hopscotch.png', activity_level: 'high', tag: 'physical', duration: 15, id: 23};
   var activity24 = {liked: true, name: 'Building a Blanket Fort', description:'Grab some blankets, sheets and pillows and build a blanket fort! Use chairs, safety pins or clothespins for structural support.',link:'http://www.todaysparent.com/family/activities/9-creative-indoor-forts/',rating: 3.0, file_name: 'blanket_fort_transparent.png', activity_level: 'low', tag: 'teamwork-related', duration: 30, id: 24};
   var activity25 = {liked: false, name: 'Flashlight Tag',description:'Grab a flashlight and choose someone to be the tagger. Everyone else hides while the tagger has their eyes closed, and then the tagger searches for them! Whoever is \'tagged\' with the light first is it!',link:'http://www.wikihow.com/Play-Flashlight-Tag', rating: 3.0, file_name: 'flashlight_tag_transparent.png', activity_level: 'high', tag: 'teamwork-related', duration: 15, id: 25};
   var activity26 = {liked: false, name: 'Puzzles', description:'Pull out a puzzle and build it together!',link:'',rating: 3.0, file_name: 'puzzle.jpg', activity_level: 'low', tag: 'teamwork-related', duration: 30, id: 26};
   var activity27 = {liked: false, name: 'Treasure Hunt', description:'There\'s treasure afoot! Hide a treasure somewhere in the house, along with a string of clues leading up to it. Lace the first clue somewhere easy to find, like inside your child’s snack or cereal bowl. Then leave as many clues as you like around the house, making a trail to the final clue with the treasure!',link:'http://www.todaysparent.com/family/activities/tips-for-creating-an-awesome-treasure-hunt/',rating: 3.0, file_name: 'treasure_hunt.jpg', activity_level: 'low', tag: 'teamwork-related', duration: 30, id: 27};


   var activities = [activity1, activity2, activity3, activity4, 
                     activity5, activity6, activity7, activity8, 
                     activity9, activity10, activity11, activity12, 
                     activity13, activity14, activity15, activity16, 
                     activity17, activity18, activity19, activity20, 
                     activity21, activity22, activity23, activity24, 
                     activity25, activity26, activity27];

   var activitiesListModel = function() {
      return activities;
   };

   var likedActivities = function() {
      var activitiesToReturn = [];
      for(var i = 0; i < activities.length; i++) {
         if(activities[i]['liked']) {
               activitiesToReturn.push(activities[i]);
         }
      }
      return activitiesToReturn;
   };

   var activitiesCount = function() {
      return activities.length;
   };

   var activitiesFilteredModel = function(duration, activity_level, tag) {
      var activitiesToReturn = [];
      for(var i = 0; i < activities.length; i++) {
         if(activities[i]['tag'] == tag) {
         // if(activities[i]['duration'] == duration 
         //    && activities[i]['tag'] == tag) {
            if(activities[i]['activity_level'] == activity_level || activity_level == 'any')
               activitiesToReturn.push(activities[i]);
         }
      }
      return activitiesToReturn;
   };

   var activityByIdModel = function(activityId) {
      var activityToReturn;
      for(var i = 0; i < activities.length; i++) {
         if(activities[i]['id'] == activityId) {
            activityToReturn = activities[i];
            break;
         }
      }
      return activityToReturn;
   };

   var bedtimeModels = {
      activitiesList: activitiesListModel,
      activitiesFiltered: activitiesFilteredModel,
      activityById: activityByIdModel,
      activitiesCount: activitiesCount,
      likedActivities: likedActivities,
   };

   if(typeof exports !== 'undefined') {
      exports.bedtimeModels = bedtimeModels;
   } else {
      window.bedtimeModels = bedtimeModels;
   }

})();
