(function(App) {
	App.CarouselItemModel = Backbone.Model.extend({
		defaults : function () {
			return {
				itemName: null,
				imageUrl: null
			}
		},

		initialize: function () {
			console.log('model initialized')
		}

	})
})(App);