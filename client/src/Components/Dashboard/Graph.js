import React, { Component } from 'react'
import { connect } from 'react-redux'
import {AreaChart, Area, XAxis, YAxis, Tooltip} from 'recharts'




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
      this.state.height !== nextState.height ||
      this.props.record.data !== nextProps.record.data ||
      this.props.dataType !== nextProps.dataType ||
      this.props.data !== nextProps.data
    )
  }

  render() {
    const {width, height} = this.state
    let data
    let d = this.props.record.data
    if(d){
      data = [...d]
    }
    return (
        <div
          className="graph"
          ref={this.saveRef}
        >
          <AreaChart width={width} height={height} data={data}
              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <XAxis
              dataKey='time' 
              stroke="#00a8f7"
              ticks={[1]} 
              />
            <YAxis stroke="#00a8f7" tickSize={15}/>
            <Tooltip/>
            <Area type='monotone' dataKey={this.props.dataType} stroke='#00a8f7' fill='#1f1e1e' />
          </AreaChart>
        </div>

    )
  }
}


const mapStateToProps = (state) => {
  let data = state.records.today
  return {
    record: state.records.selected,
    data: data[data.length - 1]
  }
}


export default connect(mapStateToProps)(Graph)