import React from 'react';

import { connect } from 'react-redux';

import * as d3 from 'd3';

const style = {
  svg: {
    width: '100%',
  },
};

let graph;

class TempHistory extends React.Component {

  componentDidMount() {
    this.initAndUpdateD3();
  }
  componentDidUpdate() {
    this.initAndUpdateD3();
  }
  componentWillUnmount() {
    graph.remove();
  }

  // FIXME: corrigé la courbe
  initAndUpdateD3() {
    const { history } = this.props;
    const values = history.map(h => h.data).toJS();
    const dates = history.map(h => h.date.getTime() / 10).toJS();

    const nbValeur = history.count();
    console.log(nbValeur);

    const m = [80, 80, 80, 80];
    const w = 500;
    const h = 200;
    // redimensionner l'interval dates[0], dates[nbValeur - 1] entre 0 et 500 pixel
    const x = d3.scaleLinear().domain([dates[0], dates[nbValeur - 1]]).range([0, w]);
    // redimensionner l'interval -100, 100 entre 0 et 500 pixel
    const y = d3.scaleLinear().domain([-100, 100]).range([h, 0]);

    const line = d3.line()
      .x((d, i) => x(i))
      .y(d => d);

    d3.select(this.graph).selectAll('*').remove();
    graph = d3.select(this.graph)
      .append('svg:svg')
      .attr('width', w + m[1] + m[3])
      .attr('height', h + m[0] + m[2])
      .append('svg:g')
      .attr('transform', `translate(${m[3]}, ${m[0]})`);
    // create yAxis
    const xAxis = d3.axisBottom().scale(x).tickSize(-h);
    // Add the x-axis.
    graph.append('svg:g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${h})`)
      .call(xAxis);
      // create left yAxis
    const yAxisLeft = d3.axisLeft().scale(y).ticks(4);
    // Add the y-axis to the left
    graph.append('svg:g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(-25,0)')
    .call(yAxisLeft);


    /* svg = d3.select(this.svg);
    svg.selectAll('.block').remove().exit();
    svg.selectAll('.block').data(values)
    .enter()
    .append('circle')
    .classed('block', 1)
    .attr('cx', (d, i) => dates[i] - dates[0])
    .attr('cy', 100)
    .attr('r', d => Math.abs(parseInt(d, 10) / 2));*/
  }

  render() {
    return (
      <div>
        <h3>Historique : </h3>
        <div
          ref={ (c) => { this.graph = c; } }
          style={ style.svg }
        />
      </div>);
  }
}

TempHistory.propTypes = {
  history: React.PropTypes.object,
}.isRequired;

const mapStateToProps = state => (
  {
    history: state.get('information').history,
  }
);

export default connect(mapStateToProps, null)(TempHistory);
