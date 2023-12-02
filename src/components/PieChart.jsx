import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }) => {
  //console.log("inside pie",data)
  const svgRef = useRef();

  useEffect(() => {
    // Set up the SVG container
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(svgRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Create a pie chart layout
    const pie = d3.pie();

    // Define an arc generator
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    // Create pie chart segments
    const arcs = svg.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g");

    // Add paths for each segment
    arcs.append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => d3.schemeCategory10[i]); // Use a color scale

    // Add text labels to each segment
    arcs.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text(d => d.data);
      return () => {
        d3.select(svgRef.current).selectAll("*").remove();
      };

  },[data]);

  return (<div ref={svgRef}></div>);
};

export default PieChart;
