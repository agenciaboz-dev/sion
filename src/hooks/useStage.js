import { useContext } from 'react'
import StageContext from '../contexts/stageContext'

export const useStage = () => {
    const stageContext = useContext(StageContext);

    return {stage: stageContext.value, setStage: stageContext.setValue, bar: stageContext.bar, setBar: stageContext.setBar}
}