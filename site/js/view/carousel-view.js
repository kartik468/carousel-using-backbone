(function(App) {
    App.CarouselView = Backbone.View.extend({

        tagName: "div",

        carousel_template: _.template(
            "<div class='items-container'></div>" +
            "<div class='items-bullets'></div>" +
            "<div class='prev carousel-arrow'></div>" +
            "<div class='next carousel-arrow'></div>"
        ),

        bullet_template: _.template("<div class='bullet bullet-<%= itemNo %>'></div>"),

        itemCollection: null,

        nextItem: null,

        initialize: function() {
            console.log('view initialized');
            this.render();
        },

        events: {
            "click .carousel-arrow.active": "onArrowClick",
            "click .bullet.active": "onBulletClick"
        },

        render: function() {
            console.log('render');
            var currentItem = this.model.get('currentItem');
            this.$el.html(this.carousel_template());
            this.$('.carousel-arrow').addClass('active');
            this.createTiles();
            this.setDefaultTile();
            this.$('.bullet').addClass('active');
            this.$('.bullet-' + currentItem).addClass('current');
        },

        createTiles: function() {
            var items = this.model.get("itemCollection"),
                self = this,
                $bullet,
                itemView;
            this.itemCollection = items;
            this.listenTo(this.itemCollection, "update", this.updateTiles);
            /// create item views
            _.each(this.itemCollection.models, function(item, index, list) {
                itemView = new App.CarouselItemView({
                    model: item,
                    attributes: {
                        class: "item item-" + index
                    }
                });
                self.$(".items-container").append(itemView.$el);
                $bullet = $(self.bullet_template({ itemNo: index }));
                $bullet.data({ index: index });
                self.$(".items-bullets").append($bullet);
            });
            // this.itemViews = new App.CarouselItemView()
        },

        setDefaultTile: function() {
            var currentItem = this.model.get("currentItem");
            this.$(".item-" + currentItem).addClass('current');
        },

        updateTiles: function() {
            debugger;
        },

        onArrowClick: function(event) {
            var currentTarget = $(event.currentTarget),
                currentItem = this.model.get('currentItem'),
                $currentItem = this.$('.item-' + currentItem),
                $nextItem,
                noOfItems = this.model.get('noOfItems') - 1,
                animationDirection,
                self = this;

            this.$('.carousel-arrow').removeClass('active');
            this.$('.bullet').removeClass('active');

            if (currentTarget.hasClass('prev')) {
                console.log('prev');
                if (currentItem !== 0) {
                    currentItem--;
                } else {
                    currentItem = noOfItems;
                }
                animationDirection = 'left'
            } else if (currentTarget.hasClass('next')) {
                console.log('next');
                if (currentItem !== noOfItems) {
                    currentItem++;
                } else {
                    currentItem = 0;
                }
                animationDirection = 'right'
            }

            $nextItem = this.$('.item-' + currentItem);
            this.nextItem = currentItem;
            this.animateItem(animationDirection, $currentItem, $nextItem, function() {
                self.model.set('currentItem', self.nextItem);
            });
            // this.setCurrentItem(currentItem);
        },

        animateItem: function(animationDirection, $currentItem, $nextItem, callback) {
            var self = this;
            $($nextItem).css('display', 'block');
            switch (animationDirection) {
                case 'left':
                    console.log('left animation');
                    $nextItem.css({ 'left': '-100%' });
                    $nextItem.addClass('prev');
                    $currentItem.animate({
                        'left': '100%'
                    })

                    $nextItem.animate({
                        'left': '0%'
                    })
                    break;
                case 'right':
                    console.log('right animation');
                    $nextItem.css({ 'left': '100%' });
                    $nextItem.addClass('next');
                    $currentItem.animate({
                        'left': '-100%'
                    })

                    $nextItem.animate({
                        'left': '0%'
                    })
                    break;
            }
            $.when($currentItem, $nextItem).done(function() {
                callback();
                self.$('.item').css({
                    'left': '0%',
                    'display': 'none'
                });
                $nextItem.css('display', 'block');
                self.$('.carousel-arrow').addClass('active');

                self.$('.bullet').removeClass('current').addClass('active');
                self.$('.bullet-' + self.nextItem).addClass('current');
            });
        },

        onBulletClick: function(event) {
            var currentTarget = $(event.currentTarget),
                currentItem = this.model.get('currentItem'),
                $currentItem = this.$('.item-' + currentItem),
                $nextItem,
                noOfItems = this.model.get('noOfItems') - 1,
                animationDirection,
                nextItem = currentTarget.data().index,
                self = this;
            if (currentTarget.hasClass('current')) {
                return;
            }

            $nextItem = this.$('.item-' + nextItem);
            this.nextItem = nextItem;
            animationDirection = (nextItem < currentItem) ? 'left' : 'right';
            this.animateItem(animationDirection, $currentItem, $nextItem, function() {
                self.model.set('currentItem', nextItem);
            });
        }
    });
})(App);
