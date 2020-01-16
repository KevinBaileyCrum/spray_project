import React from 'react'

import './registration.css'

class Registration extends React.Component {
   render() {
      return(
         <div class="box">
            <h1>Register</h1>
            <form>
               <div class="input-group">
                  <input type="text" id="username" autocomplete="off" onblur="checkInput(this)" />
                  <label for="username">Username</label>
               </div>
               <div class="input-group">
                  <input type="text" id="mpId" autocomplete="off" onblur="checkInput(this)" />
                  <label for="mpId">Mountain Project User ID</label>
               </div>
               <div class="input-group">
                  <input type="password" id="password" onblur="checkInput(this)" />
                  <label for="password">Password</label>
               </div>
               <input type="submit" value="Enter" />
            </form>
         </div>
      )
   }
}

export default Registration

