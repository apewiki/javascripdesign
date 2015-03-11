$(function(){
	var model = {
		cats: [
			{
				"name": "Mimi",
				"img":"cat.jpg",
				"count":0
			},
			{
				"name":"blue",
				"img":"blue.jpg",
				"count":0
			},
			{
				"name": "Kiddie",
				"img":"cuties.jpg",
				"count":0
			},
			{
				"name": "Merry",
				"img":"merry.jpg",
				"count":0
			}
		],

		selectedCat: 0,

		init: function() {
			model.selectedCat=0;
			console.log("model init() is called")
		}
	};

	var octupus = {
		init: function() {
			model.init();
			view1.init();
			view2.init();
			adminView.init();

		},

		getCats: function() {
			return model.cats;
		},

		getSelectedCat: function() {
			return model.cats[model.selectedCat];
		},

		incrementClicks: function() {
			 model.cats[model.selectedCat].count+=1;
		},

		setCurrentCat: function(i) {
			model.selectedCat = i;
			adminView.show();
		},

		updateAdmin: function() {
			adminView.show();
		}
	};

	var adminView = {
		init: function() {

			$("#admin_btn").bind("click", adminView.show);
			$("input[value*='Cancel']").bind("click", function(){
				$("#admin_form").hide();
				console.log("cancel is called!");
			});
			$("#admin_form").hide();
			console.log("adminView init() is called!");
		},

		show: function() {
			$("#admin_form").show();

			c=octupus.getSelectedCat();
			console.log("show() is called!"+c);
			$("input[name*='cat_name']").val(c.name);
			$("input[name*='cat_img']").val(c.img);
			$("input[name*='cat_clicks']").val(c.count);
		}
	};

	var view1 = {
		init: function() {
			//document.body.innerHTML = '';
	   		//document.body.style.background="white";

	        view1.render();
		},

		render: function() {

			var cats = octupus.getCats();
			var catList = document.getElementById("cat-list");
			console.log(catList);

			$.each(cats, function(i, cat){
				var elem=document.createElement('li');
				elem.appendChild(document.createTextNode(cat.name));
				elem.addEventListener("click", function() {
					octupus.setCurrentCat(i);
					view2.render();
				});
				catList.appendChild(elem);
			});
		}
	};

	var view2 = {
		init: function() {

			document.getElementById("cat-img").addEventListener("click", view2.clickCat);
		},

		render: function() {
			//document.getElementById("showCats").innerHTML='';
			var c = octupus.getSelectedCat();
			document.getElementById("cat-name").innerHTML = c.name;
			document.getElementById("cat-img").src = "images/"+c.img;
			document.getElementById("clicks").innerHTML = c.count;
		},

		clickCat: function() {
			octupus.incrementClicks();
			var c=octupus.getSelectedCat();
			var c = octupus.getSelectedCat(view2.selectedIndex);
			console.log("clickCat called!");
			//Don't use $(#...).innerHTML, check later
			document.getElementById("clicks").innerHTML = c.count;
			octupus.updateAdmin();
		}

	};
	octupus.init();
});