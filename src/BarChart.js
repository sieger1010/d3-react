import React, { Component } from 'react'
import './App.css'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
class BarChart extends Component {
     constructor(props){
          super(props)
          this.createBarChart = this.createBarChart.bind(this)
          this.fetchData = this.fetchData.bind(this)
          this.state = {
               hasData: false,
               data: [0, 0, 0, 0]
          }
     }
     fetchData() {
          fetch('https://pr94tcfho8.execute-api.us-east-2.amazonaws.com')
          .then(result => {
               console.log(result)
               result.json().then(data => {
                    console.log(data)
                    this.setState({
                         hasData: true,
                         data: data
                    })
               })
          })
          .catch(result => {
               console.log(result)
          })
     }
     componentDidMount() {
          this.createBarChart()
          this.fetchData()
     }
     componentDidUpdate() {
          this.createBarChart()
     }
     createBarChart() {

          const node = this.node
          const dataMax = max(this.state.data)
          const yScale = scaleLinear()
               .domain([0, dataMax])
               .range([0, this.props.size[1]])
          select(node)
               .selectAll('rect')
               .data(this.state.data)
               .enter()
               .append('rect')
     
          select(node)
               .selectAll('rect')
               .data(this.state.data)
               .exit()
               .remove()
     
          select(node)
               .selectAll('rect')
               .data(this.state.data)
               .style('fill', 'steelblue')
               .attr('x', (d,i) => i * this.props.size[0] / this.state.data.length)
               .attr('y', d => this.props.size[1] - yScale(d))
               .attr('height', d => yScale(d))
               .attr('width', 25)
     }

     render() {
          return <svg ref={node => this.node = node}
          width={this.props.size[0]} height={this.props.size[1]}>
          </svg>
     }
}
export default BarChart