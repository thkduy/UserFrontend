import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";

const MessageTextField = withStyles({
  root: {
    '& input': {
      height: '0px',
    },
    '& input + fieldset': {
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: '15px'
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },
  },
})(TextField);

export default MessageTextField;