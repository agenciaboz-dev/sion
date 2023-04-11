import {ReactComponent as Padlock} from '../../../images/safe_environment_padlock.svg'

export const SafeEnvironment = () => {
    return (
        <div className="safe-environment-statement">
            <Padlock className='padlock-icon'/>
            <p className='safe-environment-p'>Ambiente seguro da Cooperativa Sion</p>
        </div>
    )
}