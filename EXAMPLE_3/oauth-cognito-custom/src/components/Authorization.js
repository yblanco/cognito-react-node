import PropTypes from 'prop-types'

const Authorization = ({ authState, children }) => {
  // Put here redirect and everithing  https://github.com/aws-amplify/amplify-js/issues/825#issuecomment-448951805
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
