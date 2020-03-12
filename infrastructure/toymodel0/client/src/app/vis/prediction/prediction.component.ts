import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {
  @ViewChild('prediction')
  private chartContainer: ElementRef;

  margin = {top: 20, right: 20, bottom: 30, left: 40};
  constructor() { }

  ngOnInit(): void {
  }

  createChart() {
    d3.select('prediction').remove();
    const element = this.chartContainer.nativeElement;
    const bins = [
      {
        "time": "baseline",
        "score": 2
      },
      {
        "time": "3 months",
        "score": 5
      },
      {
        "time": "6 months",
        "score": 6
      }];

    const svg = d3.select(element).append('svg')
        .attr('width', element.offsetWidth)
        .attr('height', element.offsetHeight);

    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + contentHeight + ")")
      // .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", contentWidth)
      .attr("y", -56)
      .style("text-anchor", "end")
      .text("Time");

    // y-axis
    svg.append("g")
      .attr("class", "y axis")
      // .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Probability");


    // const x = d3
    //   .scaleBand()
    //   .rangeRound([0, contentWidth])
    //   .padding(0.1)
    //   .domain(data.map(d => d.time));

    // const y = d3
    //   .scaleLinear()
    //   .rangeRound([contentHeight, 0])
    //   .domain([0, d3.max(data, d => d.score)]);

    // const g = svg.append('g')
    //   .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    // g.append('g')
    //   .attr('class', 'axis axis--x')
    //   .attr('transform', 'translate(0,' + contentHeight + ')')
    //   .call(d3.axisBottom(x));

    // g.append('g')
    //   .attr('class', 'axis axis--y')
    //   .call(d3.axisLeft(y).ticks(5, ''))
    //   .append('text')
    //     .attr('transform', 'rotate(-90)')
    //     .attr('y', 10)
    //     .attr('dy', '0.71em')
    //     .attr('text-anchor', 'end')
    //     .text('Score');

    // g.selectAll('.bar')
    //   .data(data)
    //   .enter().append('rect')
    //     .attr('class', 'bar')
    //     .attr('x', d => x(d.time))
    //     .attr('y', d => y(d.score))
    //     .attr('width', x.bandwidth())
    //     .attr('height', d => contentHeight - y(d.score));
    }

    ngAfterViewInit():void {
      this.createChart()
    }
}
