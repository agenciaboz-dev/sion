import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { SafeEnvironment } from '../SafeEnvironment';

export const Signed = () => {
    return (
        <div className="Signed-Component">
            <CheckCircleIcon color="primary" fontSize={"large"} />
            <h3>Assinatura efetuada com sucesso!</h3>
            <p>Assim que todas as partes assinarem, você receberá um e-mail com o documento assinado.</p>
            <SafeEnvironment />
        </div>
    )
}