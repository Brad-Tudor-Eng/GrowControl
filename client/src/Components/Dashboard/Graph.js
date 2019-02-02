import React, { Component } from 'react'

import {AreaChart, Area, XAxis, YAxis, Tooltip} from 'recharts'

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];



class Graph extends Component {
  state = {
    width: null,
    height: null,
  }

  saveRef = (ref) => this.containerNode = ref

  measure() {
    const {clientWidth, clientHeight} = this.containerNode

    this.setState({
      width: clientWidth,
      height: clientHeight,
    })
  }

  componentDidMount() {
    this.measure()
  }

  componentDidUpdate() {
    this.measure()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.width !== nextState.width ||
      this.state.height !== nextState.height
    )
  }

  render() {
    const {width, height} = this.state

    return (
        <div
          className="graph"
          ref={this.saveRef}
        >
          <AreaChart width={width} height={height} data={data}
              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <XAxis dataKey="name" stroke="#00a8f7" tickSize={15}/>
            <YAxis stroke="#00a8f7" tickSize={15}/>
            <Tooltip/>
            <Area type='monotone' dataKey='uv' stroke='#00a8f7' fill='#1f1e1e' />
          </AreaChart>
        </div>

    )
  }
}





export default Graph