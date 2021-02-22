import TextField from '@material-ui/core/TextField';

export const TextAreaInput = ({ handler, touched, hasError, meta }) => (
  <div className={`p-0 pt-2 pb-2 clearfix float-left ${meta.colVal ? `col-md-${meta.colVal}` : `col-md-12`}`}>
    <TextField 
          id={`${meta.id}`} 
          label={`Enter ${meta.label}`} 
          multiline 
          rows={meta.rowSize ? meta.rowSize :"4"}
          inputProps={{ maxLength: `${meta.maxLen}` }}
          variant="outlined" 
          {...handler()}  
          style={{width: "100%"}}
          className={touched && hasError("required") ? 'custom-form-error' : ''}
    />
  </div>  
);