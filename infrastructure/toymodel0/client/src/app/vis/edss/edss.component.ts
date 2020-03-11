import { Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-edss',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './edss.component.html',
  styleUrls: ['./edss.component.css']
})

export class EdssComponent {
  @ViewChild('chart')
  private chartContainer: ElementRef;
  margin = {top: 20, right: 20, bottom: 30, left: 40};
  constructor() { }

  createChart() {
    d3.select('svg').remove();

    const element = this.chartContainer.nativeElement;
    const data = [
      {
        "time": "baseline",
        "score": 4
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

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(data.map(d => d.time));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(data, d => d.score)]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(5, ''))
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 10)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Score');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.time))
        .attr('y', d => y(d.score))
        .attr('width', x.bandwidth())
        .attr('height', d => contentHeight - y(d.score));
  }

  ngAfterViewInit():void {
    
      this.createChart()
  }
}
