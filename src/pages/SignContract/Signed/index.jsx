import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const Signed = () => {
    return (
        <div className='Signed-Component' >
            <CheckCircleIcon color='primary' fontSize={'large'} />
            <h3>Assinatura efetuada com sucesso!</h3>
            <p>Você receberá um e-mail com o documento assinado.</p>
            
        </div>
    )
}