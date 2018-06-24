/* feedreader.js
 * All of tests within the $() function,
 * since some of these tests may require DOM elements. 
 To ensure they don't run until the DOM is ready. */
$(function() {
    /* Test suite - RSS feeds. */

    describe('RSS Feeds', function() {

        /* To make sure that allFeeds variable 
         * has been defined and are not empty.*/
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* To ensure each feed has a defined URL
         * and that the URL are not empty. */
        it('defined URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
            });
        });
        it('not empty URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url.length).not.toBe(0);
            });
        });
        /* To ensure each feed has a defined name
         * and that the names are not empty. */
        it('defined name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
            });
        });
        it('not empty name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* Test suite - "The menu" */
    describe('The menu', function() {
        var status = $('body').hasClass('menu-hidden');
        var menuIcon = $('.menu-icon-link');
        var body = $('body');

        /* Test to ensure the menu element is hidden by default. */

        it('default hidden elements', function() {
            expect(status).toBe(true);
        });

        /* Test to ensure the menu changes visibility when 
         *	the hamburger icon is clicked */
        it('visible and hidden', function() {

            $('.menu-icon-link').trigger('click');
            expect($(body).hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').trigger('click');
            expect(body).toHaveClass('menu-hidden');
        });

    });


    /* Test suite - "Initial Entries" */
    describe('Initial Entries', function() {
        /* Test to ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container. */

        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('at least one entry element', function() {
            expect($('.feed .entry').length).toBeDefined();
            expect($('.feed .entry').length).not.toBe(0);
        });

    });

    /* Test suite - "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes. */
        var oldFeed, newFeed;

        beforeEach(function(done) {
            $('.feed').empty();
            loadFeed(0, function() {
                oldFeed = $('.feed').children()[0].innerHTML;

                loadFeed(1, function() {
                    newFeed = $('.feed').children()[0].innerHTML;
                    done();
                });

            });

        });

        it('loads new content', function(done) {
            expect(newFeed).not.toEqual(oldFeed);
            done();

        });


    });

}());