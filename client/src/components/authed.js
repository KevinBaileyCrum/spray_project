import React, { Component } from 'react'

import TickList from './ticklist'

class authed extends Component {
   constructor(props) {
      super(props)
   }

   render() {
      return (
         <div>
            <p> hello {this.props.sprayName} </p>
            <TickList
               sprayName={this.props.sprayName}
               authToken={this.props.authToken}
            />
         </div>
      )
   }
}

export default authed
