import React, { Component } from 'react'
import axios from 'axios'

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
      return this.state.friendsList.forEach(async (mpId) => {
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
            <div className="tick-card-item" key={tick.tickId}>
               <div className="tick-card">
                  <div className="tick-card-content">
                     <div className="tick-card-userName">{tick.userName}</div>
                     <div className="tick-card-date">{tick.date}</div>
                     <div className="tick-card-style">{tick.style}</div>
                     <div className="tick-card-notes">{tick.notes}</div>
                     <div className="tick-card-stars">{tick.stars}</div>
                     <div className="tick-card-routeName">{tick.routeName}</div>
                     <div className="tick-card-routeGrade">{tick.routeGrade}</div>
                  </div>
               </div>
            </div>
            )}
         </div>
      )
   }
}

export default TickList
