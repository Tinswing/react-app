import React from 'react'
import { connect } from 'react-redux'

const PayHeader = (props) => {
  return (
    <div>
      <h2>优选 收银台</h2>
      <span>{props.auth.user.nickname}</span>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps)(PayHeader)