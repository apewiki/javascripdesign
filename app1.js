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
			console.log("octupus.init() is called");
		},

		getCats: function() {
			return model.cats;
		},

		getSelectedCat: function() {
			return model.cats[model.selectedCat];
		},

		incrementClicks: function() {
			var ct = parseInt(model.cats[model.selectedCat].count);
			model.cats[model.selectedCat].count= ct + 1;
		},

		setCurrentCat: function(i) {
			model.selectedCat = i;
			adminView.update();
		},

		updateAdmin: function() {
			adminView.update();
		},

		saveSelectedCat: function(cat_name, cat_img, cat_clicks) {

			var found = false;
			model.cats[model.selectedCat].name=cat_name;
			model.cats[model.selectedCat].img = cat_img;
			model.cats[model.selectedCat].count = cat_clicks;
			console.log("saveSelectedCat is called!"+ model.cats[model.selectedCat].name);
			view1.update(model.selectedCat, cat_name);
			view2.render();
			$("#admin_form").hide();
			/*for (var i = 0; i<model.cats.length; i++) {
				if (model.cats[i].name === cat_name) {
					model.cats[i].img = cat_img;
					model.cats[i].count = cat_clicks;
					found = true;
					break;
				}
			};
			if (!found ){
				model.cats.push({"name":cat_name, "img":cat_img, "count":cat_clicks});
				view1.render();
			}*/
		}

	};

	var adminView = {
		init: function() {
			adminView.update();

			$("#admin_btn").bind("click", adminView.show);
			$("input[value*='Cancel']").bind("click", function(){
				adminView.update();
				$("#admin_form").hide();
				console.log("cancel is called!");
			});

			// preventDefault is needed to preventing navigating to start of html and re-init through script call
			// because no action is being programed in form <form action= "....">
			$("#admin_form").submit(function(e) {
				adminView.save();
				e.preventDefault();
			})
			//document.getElementById("save").addEventListener("submit",adminView.save);
			$("#admin_form").hide();
			console.log("adminView init() is called!");
		},

		update:function() {
			c=octupus.getSelectedCat();
			console.log("update() is called!"+c.name);
			$("#cat_name").val(c.name);
			$("input[name*='cat_img']").val(c.img);
			$("input[name*='cat_clicks']").val(c.count);
		},

		show: function() {
			adminView.update();
			$("#admin_form").show();
		},

		save: function() {
			var cat_name = $("#cat_name").val();
			var cat_img = $("input[name*='cat_img']").val();
			var cat_clicks = $("input[name*='cat_clicks']").val();
			console.log("save() is called!"+cat_name+":"+cat_img+":"+cat_clicks);
			octupus.saveSelectedCat(cat_name, cat_img, cat_clicks);
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
		},

		update: function(i, cat_name) {
			var catList = document.getElementById("cat-list");
			console.log(catList.childNodes[i]);
			catList.childNodes[i+1].innerHTML = cat_name;
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