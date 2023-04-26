import { Button } from '@mui/material'
import './style.scss'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export const Done = () => {
	return (
		<div className="Done-Component" style={{ flexDirection: 'column', gap: '5vw' }}>
			<CheckCircleIcon color="primary" sx={{ width: '15vw', height: 'auto' }} />
			<h1>Seja bem-vindo à Sion Energia!</h1>
			<Button sx={{ fontSize: '5vw' }} variant="contained">
				Reiniciar
			</Button>
		</div>
	)
}
