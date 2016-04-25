$(function() {

  describe('RSS Feeds', function() {

    /* Make sure there is a feed object/array and it's not empty */

    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* The following expectations interate through the feed object/array
     *   and make sure a name and url exist for each index
     */

    it('has url entries', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url.length).toBeGreaterThan(0);
      }

    });

    it('has name entries', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name.length).toBeGreaterThan(0);
      }

    });

  });

  describe('The Menu', function() {

    /* We check to see if the menu is hidden,
     *   then we check to make sure it changes on a click event.
     */

    it('The Menu is hidden, By default.', function() {
      expect($('body').hasClass('menu-hidden')).toBeTruthy();
    });

    it('The Menu changes when clicked.', function() {
      $('.menu-icon-link').trigger('click');
      expect($('body').hasClass('menu-hidden')).toBeFalsy();

      $('.menu-icon-link').trigger('click');
      expect($('body').hasClass('menu-hidden')).toBeTruthy();
    });

  });

  describe('Initial Entries', function() {

    /* We make sure the feed container is populated with atleast one item
     *    with a link.
     */

    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it('There is atleast one article in the .feed container with a link.', function() {
      expect($('.feed').find('.entry').length).toBeGreaterThan(0);
    });

  });

  describe('New Feed Selection', function() {

    /*
     *  We evaluate a with b to check if a new feed has been loaded or
     *  if it is just a duplicate of  the first feed
     */

    var a, b;

    beforeEach(function(done) {
      loadFeed(0, function() {
        a = $('.entry').html();
        done();
      });
    });

    it('actually loads the next feed.', function(done) {
      loadFeed(1, function() {
        b = $('.entry').html();
        expect(b).not.toBe(a);
        done();
      });

    });

  });
}());
