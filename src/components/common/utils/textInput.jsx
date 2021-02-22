import TextField from '@material-ui/core/TextField';

export const TextInput = ({ handler, touched, hasError, meta }) => (
  <div className={`p-0 pt-2 pb-2 clearfix float-left ${meta.colVal ? `col-md-${meta.colVal}` : `col-md-12`}`}>
    <TextField 
      id={`${meta.id}`} 
      inputProps={{ maxLength: `${meta.maxlen}` }}
      label={`${meta.label}`} 
      type={`${meta.type}` ? `${meta.type}` : 'text'}
      variant="outlined" 
      {...handler()}  
      style={{width: "100%"}}
      size="small"
      className={touched && hasError("required") ? 'custom-form-error' : ''}
    />
  </div>  
);