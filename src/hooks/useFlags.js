import { ReactComponent as GreenIcon } from '../images/simulator/green.svg'
import { ReactComponent as YellowIcon } from '../images/simulator/yellow.svg'
import { ReactComponent as RedIcon } from '../images/simulator/red.svg'
import { ReactComponent as Red2Icon } from '../images/simulator/red2.svg'

export const useFlags = () => {
    const flags = [
        {
            name: 'Verde',
            factor: 0.046,
            icon: <GreenIcon />
        },
        {
            name: 'Amarela',
            factor: 0.06,
            icon: <YellowIcon />
        },
        {
            name: 'Vermelha 1',
            factor: 0.076,
            icon: <RedIcon />
        },
        {
            name: 'Vermelha 2',
            factor: 0.1,
            icon: <Red2Icon />
        },
    ]

    return flags
}