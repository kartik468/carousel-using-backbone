(function(App) {
    $(document).ready(function() {
        $(".handle").on("click", function() {
            $("nav ul").toggleClass("hide");
        });


        // var carouselModel, carouselView;
        var items = [
            {
                "itemName" : "tile 1",
                "imageUrl": "images/tiles/tile1.png"
            },
            {
                "itemName" : "tile 2",
                "imageUrl": "images/tiles/tile2.png"
            },
            {
                "itemName" : "tile 3",
                "imageUrl": "images/tiles/tile3.png"
            },
            {
                "itemName" : "tile 4",
                "imageUrl": "images/tiles/tile4.png"
            },
            {
                "itemName" : "tile 5",
                "imageUrl": "images/tiles/tile5.png"
            }
        ];

        window.carouselModel = new App.CarouselModel ({itemsData: items});
        window.carouselView = new App.CarouselView({
            model: carouselModel,
            attributes: {
                id: 'portfolio-carousel'
            }
        });

        $("#portfolio-carousel-container").prepend(carouselView.$el);
    })
})(App);
