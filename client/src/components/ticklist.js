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
         friendsList: []
      }
   }

   getFriends()  {
      return axios.get(API + 'getFriends', {
         headers: {
            'Authorization': `${this.props.authToken}`
         },
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

   getTicks() {
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
      await this.getFriends()
      await this.getTicks()
   }

   async componentDidUpdate(prevProps) {
      if (this.props.updatedInteger !== prevProps.updatedInteger) {
         await this.getFriends()
         await this.getTicks()
      }
   }


   render() {
      return (
         <div>
            {this.state.isLoading ?
               (<IonSpinner/>)
            :
               (
                  this.state.ticks.sort((a,b) => a.data - b.data).map(tick =>
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

   // render() {
   //    return (
   //       <div>
   //          <IonSpinner/>
   //       </div>
   //    )
   // }
}

export default TickList
