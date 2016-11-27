(function(App) {
    App.CarouselItemView = Backbone.View.extend({

        tagName: "div",

        carousel_item_template: _.template("<img class='item-image' />"),

        initialize: function() {
            console.log('view initialized');
            this.render();
        },

        events: function() {

        },

        render: function() {
            console.log('render');            
            var imageUrl = this.model.get("imageUrl");
            this.$el.html(this.carousel_item_template());
            // this.$el.css('background-image', 'url(' + imageUrl + ')');
            this.$('.item-image').attr('src', imageUrl);
        },
    })
})(App);
