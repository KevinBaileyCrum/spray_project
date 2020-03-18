import React, { Component } from 'react'

import TickList from './ticklist'
import AddFriend from './addFriend'

class authed extends Component {
   constructor(props) {
      super(props)
   }

   render() {
      return (
         <div>
            <p> hello {this.props.sprayName} </p>
            {/* <TickList */}
            {/*    sprayName={this.props.sprayName} */}
            {/*    authToken={this.props.authToken} */}
            {/* /> */}
            <AddFriend />
         </div>
      )
   }
}

export default authed
