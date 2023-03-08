
import { TextField } from '@mui/material';
import InputMask from 'react-input-mask';

export const InputField = ({ children, id, title, handleChange, value, type, mask, autoFocus, error, errorText, multiline, select }) => {
    
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
                    rows={10}
                    sx={{fontFamily: "Montserrats"}}
                    select={select}
                    // InputProps={{style: {borderRadius: '4vw'}}}
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
                rows={10}
                sx={{fontFamily: "Montserrats"}}
                select={select}
                // InputProps={{style: {borderRadius: '4vw'}}}
            />
            }
        </div>
    )
}