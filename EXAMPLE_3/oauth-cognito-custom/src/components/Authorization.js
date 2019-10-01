import PropTypes from 'prop-types'

const Authorization = ({ authState, children }) => {
  let show = null;
  if(authState === "signedIn"){
    show = children;
  }
  return show;
}

Authorization.propTypes = {
  authState: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
}

export default Authorization;
