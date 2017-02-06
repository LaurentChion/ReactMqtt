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

  initAndUpdateD3() {
    const { history } = this.props;

    const data = history.map(h => (
      {
        value: h.data,
        date: h.date,
      }),
    ).toJS();

    const nbValeur = history.count();

    const m = [20, 20, 20, 80];
    const w = 500;
    const h = 100;

    const dateMin = data[0].date;
    const dateMax = data[nbValeur - 1].date;

    // FIXME: calculé min et max
    let tempMin = data[0].value;
    let tempMax = data[0].value;

    for (let i = 1; i < nbValeur; i += 1) {
      if (data[i].value < tempMin) {
        tempMin = data[i].value;
      }
      if (data[i].value > tempMax) {
        tempMax = data[i].value;
      }
    }

    // redimensionner l'interval des dates
    const xScale = d3.scaleTime().range([0, w]).domain([dateMin, dateMax]);
    // redimensionner l'interval des valeurs
    const yScale = d3.scaleLinear().range([h, 0]).domain([tempMin, tempMax]);

    // définir la fonction qui génère la ligne
    const lineGen = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value));

    // creation du svg de base
    d3.select(this.graph).selectAll('*').remove();
    graph = d3.select(this.graph)
      .append('svg:svg')
      .attr('width', w + m[1] + m[3])
      .attr('height', h + m[0] + m[2])
      .append('svg:g')
      .attr('transform', `translate(${m[3]}, ${m[0]})`);

    // Ajout de l'axe x au svg
    const xAxis = d3.axisBottom().scale(xScale).tickSize(-h);
    graph.append('svg:g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${h})`)
      .call(xAxis);

    // Ajout de l'axe y au svg
    const yAxisLeft = d3.axisLeft().scale(yScale).ticks(4);
    graph.append('svg:g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(-25,0)')
    .call(yAxisLeft);

    // ajout de la ligne au svg
    graph.append('svg:path')
    .attr('d', lineGen(data))
    .attr('stroke-width', 2)
    .attr('stroke', 'blue')
    .attr('fill', 'none');
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
