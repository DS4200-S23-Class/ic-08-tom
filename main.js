const FRAME_HEIGHT = 550;
const FRAME_WIDTH = 550; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

const FRAME2 = d3.select("#vis1") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

//Creates a function to structure the bar graph
function build_bar_plot() {
	d3.csv("data/data.csv").then((data) => {

		// Define scale functions that maps our data values 
		// provides some space between each line on the bar graph
	  const X_SCALE2 = d3.scaleBand()
	  	.domain(data.map(function(d) { return d.Category; }))
	  	.range([0, VIS_WIDTH]).padding(0.1);

	  // Define scale functions that maps our data values 
	  const Y_SCALE2 = d3.scaleLinear()
	  	.domain([0, 100000])
	  	.range([VIS_HEIGHT, 0]);

	  //Allows the bar graph to be spaced over alligned with the above graph
		const g = FRAME2.append("g")
	             .attr("transform", "translate(" + MARGINS.top + "," + MARGINS.left + ")");

	  //Put the x-axis on the bottom of the graph
	  g.append("g")
	   .attr("transform", "translate(0," + VIS_HEIGHT + ")")
	   .call(d3.axisBottom(X_SCALE2));

		//Put the y-axis on the side of the graph
	  g.append("g")
	   .call(d3.axisLeft(Y_SCALE2).ticks(10))
	   		.attr("font-size", "10px");

		// Creates the svg element with the axes and bar lines filled in with blue
		g.selectAll()
	   .data(data)
	   .enter()
	   .append("rect")
		   .attr("x", function(d) { return X_SCALE2(d.Category); })
		   .attr("y", function(d) { return Y_SCALE2(d.Value); })
		   .attr("width", X_SCALE2.bandwidth())
		   .attr("height", function(d) { return VIS_HEIGHT - Y_SCALE2(d.Value); })
		   .attr("fill", "blue")
  });
}

//Builds the bar chart
build_bar_plot()