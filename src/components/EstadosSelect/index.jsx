import { MenuItem } from '@mui/material';
import { useEstadosBrasil } from '../../hooks/useEstadosBrasil';
import { InputField } from '../InputField';

export const EstadosSelect = ({ handleChange, value, title, id }) => {

    const estados = useEstadosBrasil()
    
    return (
        <InputField select id={id} title={title} handleChange={handleChange} value={value} >
            {estados.map(estado => <MenuItem
                key={estado.value}
                value={estado.value}
                style={{width: '100%'}}
            >{estado.label}</MenuItem>)}
        </InputField>
    )
}