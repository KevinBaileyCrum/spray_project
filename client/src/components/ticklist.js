import React, { Component } from 'react'
import axios from 'axios'

import TickCard from './tickCard'

const API = 'http://localhost:9000/' // pass this to component from app?

class TickList extends Component{
   constructor(props){
      super(props)
      this.state = {
         ticks: [],
         friendsList: []
      }
   }

   async getFriends()  {
      return axios.get(API + 'getFriends', {
         params: {
            sprayName: `${this.props.sprayName}`
         }
      })
         .then(response => {
            this.setState({
               friendsList: response.data
            })
         })
         .catch(error => {
            console.log(error)
         })
   }

   async getTicks() {
      this.state.friendsList.forEach(async (mpId) => {
         console.log(mpId)
         axios.get(API + 'getTicks', {
            headers: {
               'Authorization': `${this.props.authToken}`
            },
            params: {
                  mpId: mpId
            }
         })
            .then(response => {
               const ticks = response.data
               this.setState({
                  ticks: this.state.ticks.concat(response.data)

               })
            })
            .catch(error => {
               console.log(error)
            })
      })
   }

   async componentDidMount() {
      await this.getFriends()
      await this.getTicks()
      console.log('here')
   }

   render() {
      return (
         <div className="tick-card-list">
            { this.state.ticks.map(tick =>
               <TickCard
                  // routeImg = {tick.routeImg}
                  // routeName = {tick.routeName}
                  // routeGrade = {tick.routeGrade}
                  // style = {tick.syle}
                  // date = {tick.date}
                  tick = {tick}
               />
            )}
         </div>
      )
   }
}

export default TickList
