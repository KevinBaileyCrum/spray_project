import React, { Component } from 'react'
import axios from 'axios'

import TickCard from './tickCard'

import {
   IonSpinner,
   IonContent
} from '@ionic/react'

const API = 'http://localhost:9000/' // pass this to component from app?

class TickList extends Component{
   constructor(props){
      super(props)
      this.state = {
         isLoading: true,
         ticks: [],
         // friendsList: []
      }
   }

   // getFriends()  {
   //    return axios.get(API + 'getFriends', {
   //       headers: {
   //          'Authorization': `${this.props.authToken}`
   //       },
   //       params: {
   //          sprayName: `${this.props.sprayName}`
   //       }
   //    })
   //       .then(response => {
   //          this.setState({
   //             friendsList: response.data
   //          })
   //       })
   //       .catch(error => {
   //          console.log(error)
   //       })
   // }

   getTicks(friendsList) {
      friendsList.forEach(async (mpId) => {
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
               this.setState({
                  ticks: this.state.ticks.concat(response.data),
                  isLoading: false
               })
            })
            .catch(error => {
               console.log(error)
            })
      })
   }

   async componentDidMount() {
      // await this.getFriends()
      // await this.getTicks(this.state.friendsList)
      await this.props.getFriends()
      await this.getTicks(this.props.friendsList)
   }

   async componentDidUpdate(prevProps) {
      if (this.props.newFriendMpId !== prevProps.newFriendMpId) {
         // this.setState({
         //    friendsList: [...this.state.friendsList, this.props.newFriendMpId]
         // })
         await this.getTicks([this.props.newFriendMpId]) // add new ticks
      }
   }


   render() {
      const sortedTicklist = this.state.ticks.sort((a,b) => {
         return new Date(b.date) - new Date(a.date)
      })
      console.log(sortedTicklist)
      return (
         <div>
            {this.state.isLoading ?
               (<IonSpinner/>)
            :
               (
                  sortedTicklist.map(tick =>
                     <div key = {tick.tickId}>
                        <TickCard
                           tick = {tick}
                        />
                     </div>
                  )
               )
            }
         </div>
      )
   }

}

export default TickList
