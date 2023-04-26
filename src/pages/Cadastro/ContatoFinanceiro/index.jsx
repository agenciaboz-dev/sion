import { Alert, Snackbar } from '@mui/material'
import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../api'
import { InputField } from '../../../components/InputField'
import { MuiLoading } from '../../../components/MuiLoading'
import { useClient } from '../../../hooks/useClient'
import { NavButtons } from '../NavButtons'
import './style.scss'

export const ContatoFinanceiro = ({}) => {
	const navigate = useNavigate()
	const client = useClient()

	const [loading, setLoading] = useState(false)
	const [snackbar, setSnackbar] = useState(false)

	const initialValues = {
		name: '',
		phone: '',
		email: '',
		login: '',
		password: '',
	}

	const goBack = (event) => {
		event.preventDefault()
		navigate('/cadastro/contrato')
	}

	const nextStage = (values) => {
		client.setValue({ ...client.value, financial: values })
		setLoading(true)

		api.post('/contract/financial', { ...values, id: client.value.id })
			.then((response) => console.log(response.data))
			.catch((error) => console.error(error))
			.finally(() => {
				setLoading(false)
				client.setValue(null)
				navigate('/cadastro/done')
			})
	}

	useEffect(() => {
		setTimeout(() => setSnackbar(true), 1500)
	}, [])

	return (
		<div className="ContatoFinanceiro-Component">
			<h2>Cadastro Financeiro</h2>
			<Formik initialValues={initialValues} onSubmit={nextStage}>
				{({ values, handleChange, submitForm }) => (
					<Form
						onKeyDown={(event) => {
							if (event.key === 'Enter') {
								event.preventDefault()
								submitForm()
							}
						}}
					>
						<InputField
							title={'Responsável Financeiro'}
							id="name"
							value={values.name}
							handleChange={handleChange}
						/>
						<InputField
							title={'Telefone Financeiro'}
							inputMode={'tel'}
							mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
							id="phone"
							value={values.phone}
							handleChange={handleChange}
						/>
						<InputField
							title={'E-mail do responsável financeiro'}
							id="email"
							value={values.email}
							handleChange={handleChange}
						/>
						<h2>Credenciais</h2>
						<InputField title={'Login'} id="login" value={values.login} handleChange={handleChange} />
						<InputField title={'Senha'} id="password" value={values.password} handleChange={handleChange} />
						<NavButtons
							goBack={(event) => goBack(event)}
							nextStage={(event) => {
								event.preventDefault()
								submitForm()
							}}
							children={loading ? <MuiLoading size={'5vw'} /> : <>Finalizar</>}
						/>
					</Form>
				)}
			</Formik>
			<Snackbar
				open={snackbar}
				autoHideDuration={3000}
				onClose={() => setSnackbar(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert onClose={() => setSnackbar(false)} severity={'success'} sx={{ width: '100%' }}>
					Termo de adesão enviado para assinatura
				</Alert>
			</Snackbar>
		</div>
	)
}
