import { TextField } from '@mui/material';
import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import MaskedInput from 'react-text-mask';
import { useValidationErrors } from '../../hooks/useValidationsErrors';

export const InputField = ({ children, id, title, handleChange, value, type, mask, autoFocus, error, errorText, multiline, select, inputProps, innerRef, not_required, readOnly }) => {

    const newRef = useRef(null)
    const ref = innerRef || newRef

    const isMobile = useMediaQuery({maxWidth:600})

    const errors = useValidationErrors()
    if (errorText == errors.required) {
        error = false
    }

    return (
        <div className='InputMui-Component' style={{flexDirection: 'column'}} >
            {mask ? 
            <MaskedInput
            ref={ref}
            mask={mask}
            id={id}
            name={id}
            required={!not_required}
            onChange={handleChange}
            value={value}
            guide={false}
            render={(ref, props) => (
                <TextField
                    inputRef={ref}
                    {...props}
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
                    FormHelperTextProps={{style:{fontSize: isMobile ? '5vw' : '1.2vw'}}}
                    InputLabelProps={{style:{fontSize: isMobile ? '5vw' : '1.2vw'}}}
                    rows={3}
                    sx={{fontFamily: "Montserrats"}}
                    select={select}
                    InputProps={{readOnly}}
                />
            )}
            />
            :
            <TextField
                children={children}
                autoFocus={autoFocus}
                name={id} 
                onChange={handleChange}
                value={value}
                required={!not_required}
                type={type || 'text'}
                error={error}
                helperText={error ? errorText : ''}
                margin="dense"
                label={title}
                fullWidth
                variant="outlined"
                className='input-field'
                multiline={multiline}
                FormHelperTextProps={{style:{fontSize: isMobile ? '5vw' : '1.2vw'}}}
                InputLabelProps={{style:{fontSize: isMobile ? '5vw' : '1.2vw'}}}
                // inputProps={inputProps || {style:{height: '0'}}}
                rows={3}
                sx={{fontFamily: "Montserrats"}}
                select={select}
                InputProps={{readOnly}}
            />
            }
        </div>
    )
}