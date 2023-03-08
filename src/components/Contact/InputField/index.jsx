import { TextField } from '@mui/material';
import InputMask from 'react-input-mask';

export const InputField = ({ children, id, title, handleChange, value, type, mask, autoFocus, error, errorText, multiline, select, inputProps }) => {
    
    return (
        <div className='InputMui-Component' style={{flexDirection: 'column'}} >
            {mask ? 
            <InputMask mask={mask} alwaysShowMask={false} name={id} required onChange={handleChange} value={value} maskChar={null} >
                {(inputProps) => <TextField
                    {...inputProps}
                    autoFocus={autoFocus}
                    type={type || 'text'}
                    error={error}
                    helperText={error ? errorText : ''}
                    margin="dense"
                    label={title}
                    fullWidth
                    variant="outlined"
                    className='input-field'
                    multiline={multiline}
                    FormHelperTextProps={{style:{fontSize: '1.2vw'}}}
                    InputLabelProps={{style:{fontSize: '1.2vw'}}}
                    inputProps={{style:{minHeight: '1vw', padding: '0.5vw'}}}
                    rows={3}
                    sx={{fontFamily: "Montserrats"}}
                    select={select}
                />}
            </InputMask>
            :
            <TextField
                children={children}
                autoFocus={autoFocus}
                name={id} 
                onChange={handleChange}
                value={value}
                required
                type={type || 'text'}
                error={error}
                helperText={error ? errorText : ''}
                margin="dense"
                label={title}
                fullWidth
                variant="outlined"
                className='input-field'
                multiline={multiline}
                FormHelperTextProps={{style:{fontSize: '1.2vw'}}}
                InputLabelProps={{style:{fontSize: '1.2vw'}}}
                inputProps={{style:{minHeight: '1vw', padding: '0.5vw'}}}
                // inputProps={inputProps || {style:{height: '0'}}}
                rows={3}
                sx={{fontFamily: "Montserrats"}}
                select={select}
            />
            }
        </div>
    )
}