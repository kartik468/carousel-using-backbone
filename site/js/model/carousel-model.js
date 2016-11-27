(function(App) {
	App.CarouselModel = Backbone.Model.extend({
		defaults : function () {
			return {
				currentItem: 3,
				noOfItems: null,
				itemsData: null,
				itemCollection: null
			}
		},

		initialize: function () {
			console.log('model initialized');
			this.createItems();
		},

		createItems : function () {
			var items = this.get("itemsData"),
				itemCollection;
			
			itemCollection = new App.CarouselItemCollection(items);
			this.set("itemCollection", itemCollection);
			this.set("noOfItems", itemCollection.length);
		},

		addItem: function(){

		}

	})
})(App);