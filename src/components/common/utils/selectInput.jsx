import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

export const SelectInput = ({ handler, touched, hasError, meta }) => (
  <div className="col-md-12 p-2 clearfix">
    <select {...handler()}
      className={`p-0 pl-2 clearfix custom-bootstrap-select ${meta.colVal ? `col-md-${meta.colVal}` : `col-md-12`}`}
      input={<BootstrapInput name={`${meta.name}`} />}>
      <option value="" disabled>
          Select {`${meta.label}`}
      </option>
      {meta.masterdata.map((option, idx) => (
          <option key={idx} value={option.Key}>{option.Value}</option>
      ))}
  </select>
  {/* <span className="col-md-12 pl-3 pt-1 mb-2 clearfix float-right selection-error">
      {touched
      && hasError("required")
      && `${meta.label} is required`}
    </span> */}
  </div>  
);