var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider){
    
    $urlRouterProvider.otherwise('/home');

 	$stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'graph.html'
        })

    
});


myApp.controller('analyticsCntrl', function($scope,$http,$window) {

	$scope.chart_data = [];
	$http.get("http://127.0.0.1:8080/analytics/api/AnalyticsData")
    .success(function(response) {
        console.log("Hi I am API") // debugging
        $scope.items = response["data"];
      
        });

    $scope.submitForm = function(isValid) {
		var formdata = new FormData();
		$scope.chart_data = [];
		formdata.append("fromDate", $scope.date + " " +$scope.fromTime + ":00");
		console.log($scope.date + " " +$scope.fromTime + ":00");
		formdata.append("toDate", $scope.date + " " +$scope.toTime + ":00")
		console.log($scope.date + " " +$scope.toTime + ":00")
		console.log("filter submitted");
		   if (isValid) {
            $http({
                url:"http://api.url.com",
                method:'POST',
                transformRequest: angular.identity,
                headers:{'Content-Type': undefined},
                data: formdata
                }).success(function(response) {
                	$scope.chart_data = [];
                	log_data = response["Data"];
                	console.log(log_data);
                	var items_loc1 = [];
                	var items_loc2 = [];
                	var items_loc3 = [];
                	for (var i=0; i<log_data.length; i++) {
      					var log_loc = log_data[i]["fields"]["location"]
      					if (log_loc == "Loc1") {
      						var date = log_data[i]["fields"]["logdate"]
      						var log_date = new Date(date);
      						var log_hour = log_date.getHours();
							var person_count = log_data[i]["fields"]["person"]
							
							if (items_loc1.length == 0) { 
								items_loc1.push({"time":log_hour, "y":person_count})
							}

							var match = 0
							if (items_loc1.length != 0){
								for (var j=0; j<items_loc1.length; j++) {
									if (items_loc1[j]["time"] == log_hour ) {
										items_loc1[j]["y"] += person_count;
										match = 1
									}
								}
							}

							if (match == 0) {
								items_loc1.push({"time":log_hour, "y":person_count}) 
							}					

      					}

      				if (log_loc == "Loc2") {
      						var date = log_data[i]["fields"]["logdate"]
      						var log_date = new Date(date);
      						var log_hour = log_date.getHours();
							var person_count = log_data[i]["fields"]["person"]
							
							if (items_loc2.length == 0) { 
								items_loc2.push({"time":log_hour, "y":person_count})
							}

							var match = 0
							if (items_loc2.length != 0){
								for (var j=0; j<items_loc2.length; j++) {
									if (items_loc2[j]["time"] == log_hour ) {
										items_loc2[j]["y"] += person_count;
										match = 1
									}
								}
							}

							if (match == 0) {
								items_loc2.push({"time":log_hour, "y":person_count}) 
							}					

      					}

      				if (log_loc == "Loc3") {
      						var date = log_data[i]["fields"]["logdate"]
      						var log_date = new Date(date);
      						var log_hour = log_date.getHours();
							var person_count = log_data[i]["fields"]["person"]
							
							if (items_loc3.length == 0) { 
								items_loc3.push({"time":log_hour, "y":person_count})
							}

							var match = 0
							if (items_loc3.length != 0){
								for (var j=0; j<items_loc3.length; j++) {
									if (items_loc3[j]["time"] == log_hour ) {
										items_loc3[j]["y"] += person_count;
										match = 1
									}
								}
							}

							if (match == 0) {
								items_loc3.push({"time":log_hour, "y":person_count}) 
							}					

      					}

      			}
      				
      				for (var i=0; i<24; i++) {
      					var dummy = 0;
      					for (var j=0; j<items_loc1.length; j++) {
							if (items_loc1[j]["time"] == i ) {
								dummy = 1;
							}
						}
						if (dummy != 1){
							items_loc1.push({"time":i, "y":0})
							}
					} 

					for (var i=0; i<24; i++) {
      					var dummy = 0;
      					for (var j=0; j<items_loc2.length; j++) {
							if (items_loc2[j]["time"] == i ) {
								dummy = 1;
							}
						}
						if (dummy != 1){
							items_loc2.push({"time":i, "y":0})
							}
					}


					for (var i=0; i<24; i++) {
      					var dummy = 0;
      					for (var j=0; j<items_loc3.length; j++) {
							if (items_loc3[j]["time"] == i ) {
								dummy = 1;
							}
						}
						if (dummy != 1){
							items_loc3.push({"time":i, "y":0})
							}
					}


      				$scope.chart_data.push(items_loc1);
      				$scope.chart_data.push(items_loc2);
      				$scope.chart_data.push(items_loc3);
      				console.log(items_loc1);
      				console.log(items_loc2);
      				console.log(items_loc3);
      				console.log($scope.chart_data);

                	
				});

			}	 
		}
	


		var w = 600;                        //width
		var h = 500;                        //height
		var padding = {top: 40, right: 40, bottom: 40, left:40};
		var dataset;
		//Set up stack method
		var stack = d3.layout.stack();

		d3.json("mperday.json",function(json){
			dataset = json;

			//Data, stacked
			stack(dataset);

			var color_hash = {
				    0 : ["Loc1","#1f77b4"],
					1 : ["Loc2","#2ca02c"],
					2 : ["Loc3","#ff7f0e"]

			};


			//Set up scales
			var xScale = d3.time.scale()
				.domain([new Date(dataset[0][0].time),d3.time.day.offset(new Date(dataset[0][dataset[0].length-1].time),8)])
				.rangeRound([0, w-padding.left-padding.right]);

			var yScale = d3.scale.linear()
				.domain([0,				
					d3.max(dataset, function(d) {
						return d3.max(d, function(d) {
							return d.y0 + d.y;
						});
					})
				])
				.range([h-padding.bottom-padding.top,0]);

			var xAxis = d3.svg.axis()
						   .scale(xScale)
						   .orient("bottom")
						   .ticks(d3.time.days,1);

			var yAxis = d3.svg.axis()
						   .scale(yScale)
						   .orient("left")
						   .ticks(10);



			//Easy colors accessible via a 10-step ordinal scale
			var colors = d3.scale.category10();

			//Create SVG element
			var svg = d3.select("#mbars")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

			// Add a group for each row of data
			var groups = svg.selectAll("g")
				.data(dataset)
				.enter()
				.append("g")
				.attr("class","rgroups")
				.attr("transform","translate("+ padding.left + "," + (h - padding.bottom) +")")
				.style("fill", function(d, i) {
					return color_hash[dataset.indexOf(d)][1];
				});

			// Add a rect for each data value
			var rects = groups.selectAll("rect")
				.data(function(d) { return d; })
				.enter()
				.append("rect")
				.attr("width", 2)
				.style("fill-opacity",1e-6);


			rects.transition()
			     .duration(function(d,i){
			    	 return 500 * i;
			     })
			     .ease("linear")
			    .attr("x", function(d) {
					return xScale(new Date(d.time));
				})
				.attr("y", function(d) {
					return -(- yScale(d.y0) - yScale(d.y) + (h - padding.top - padding.bottom)*2);
				})
				.attr("height", function(d) {
					return -yScale(d.y) + (h - padding.top - padding.bottom);
				})
				.attr("width", 15)
				.style("fill-opacity",1);

				svg.append("g")
					.attr("class","x axis")
					.attr("transform","translate(40," + (h - padding.bottom) + ")")
					.call(xAxis);


				svg.append("g")
					.attr("class","y axis")
					.attr("transform","translate(" + padding.left + "," + padding.top + ")")
					.call(yAxis);

				// adding legend

				var legend = svg.append("g")
								.attr("class","legend")
								.attr("x", w - padding.right - 65)
								.attr("y", 25)
								.attr("height", 100)
								.attr("width",100);

				legend.selectAll("g").data(dataset)
					  .enter()
					  .append('g')
					  .each(function(d,i){
					  	var g = d3.select(this);
					  	g.append("rect")
					  		.attr("x", w - padding.right - 65)
					  		.attr("y", i*25 + 10)
					  		.attr("width", 10)
					  		.attr("height",10)
					  		.style("fill",color_hash[String(i)][1]);

					  	g.append("text")
					  	 .attr("x", w - padding.right - 50)
					  	 .attr("y", i*25 + 20)
					  	 .attr("height",30)
					  	 .attr("width",100)
					  	 .style("fill",color_hash[String(i)][1])
					  	 .text(color_hash[String(i)][0]);
					  });

				svg.append("text")
				.attr("transform","rotate(-90)")
				.attr("y", 0 - 5)
				.attr("x", 0-(h/2))
				.attr("dy","1em")
				.text("Number of Passengers");

			svg.append("text")
			   .attr("class","xtext")
			   .attr("x",w/2 - padding.left)
			   .attr("y",h - 5)
			   .attr("text-anchor","middle")
			   .text("Days");

			svg.append("text")
	        .attr("class","title")
	        .attr("x", (w / 2))             
	        .attr("y", 20)
	        .attr("text-anchor", "middle")  
	        .style("font-size", "16px") 
	        .style("text-decoration", "underline")  
	        .text("Number of Passengers per day.");

			//On click, update with new data			
			d3.select("#newdata")
				.on("click", function() {
					// var date = this.getAttribute("value");
         
						dataset = $scope.chart_data;
						console.log(dataset);
						stack(dataset);

						console.log(dataset);

						xScale.domain([new Date(0, 0, 0,dataset[0][0].time,0, 0, 0),new Date(0, 0, 0,dataset[0][dataset[0].length-1].time,0, 0, 0)])
						.rangeRound([0, w-padding.left-padding.right]);

						yScale.domain([0,				
										d3.max(dataset, function(d) {
											return d3.max(d, function(d) {
												return d.y0 + d.y;
											});
										})		
									])
									.range([h-padding.bottom-padding.top,0]);

						xAxis.scale(xScale)
						     .ticks(d3.time.hour,2)
						     .tickFormat(d3.time.format("%H"));

						yAxis.scale(yScale)
						     .orient("left")
						     .ticks(10);

						 groups = svg.selectAll(".rgroups")
		                    .data(dataset);

		                    groups.enter().append("g")
		                    .attr("class","rgroups")
		                    .attr("transform","translate("+ padding.left + "," + (h - padding.bottom) +")")
		                    .style("fill",function(d,i){
		                        return color(i);
		                    });


		                    rect = groups.selectAll("rect")
		                    .data(function(d){return d;});

		                    rect.enter()
		                      .append("rect")
		                      .attr("x",w)
		                      .attr("width",1)
		                      .style("fill-opacity",1e-6);

		                rect.transition()
		                    .duration(1000)
		                    .ease("linear")
		                    .attr("x",function(d){
		                        return xScale(new Date(0, 0, 0,d.time,0, 0, 0));
		                    })
		                    .attr("y",function(d){
		                        return -(- yScale(d.y0) - yScale(d.y) + (h - padding.top - padding.bottom)*2);
		                    })
		                    .attr("height",function(d){
		                        return -yScale(d.y) + (h - padding.top - padding.bottom);
		                    })
		                    .attr("width",15)
		                    .style("fill-opacity",1);

		                rect.exit()
					       .transition()
					       .duration(1000)
					       .ease("circle")
					       .attr("x",w)
					       .remove();

		                groups.exit()
					       .transition()
					       .duration(1000)
					       .ease("circle")
					       .attr("x",w)
					       .remove();


						svg.select(".x.axis")
						   .transition()
						   .duration(1000)
						   .ease("circle")
						   .call(xAxis);

						svg.select(".y.axis")
						   .transition()
						   .duration(1000)
						   .ease("circle")
						   .call(yAxis);

						svg.select(".xtext")
						   .text("Minutes");

						svg.select(".title")
				        .text("Number of Passengers per minute on " + $scope.date + ".");
					});		
				});

	


});
