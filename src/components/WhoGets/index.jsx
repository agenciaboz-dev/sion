import './style.scss';
import useMeasure from 'react-use-measure';

export const WhoGets = () => {
    
    const [ref, {height}] = useMeasure()

    return (
        <div className='WhoGets-Component' ref={ref} >
            <div className="blue-background"></div>
            <div className="white-background"></div>

            <div className="main-container">
                <div className="customers-images">
                    <div className="who">
                        <h1>Quem recebe nossa energia</h1>
                    </div>
                    <div className="c-img">
                        <img src="/images/customers/confiance.webp" alt="" />
                    </div>
                    <div className="c-img">
                        <img src="/images/customers/toyota_sulpar.webp" alt="" />
                    </div>
                    <div className="c-img">
                        <img src="/images/customers/elasto.webp" alt="" />
                    </div>
                    <div className="c-img">
                        <img src="/images/customers/mcdonalds.webp" alt="" />
                    </div>
                    <div className="c-img">
                        <img src="/images/customers/baraquias.webp" alt="" />
                    </div>
                    <div className="c-img">
                        <img src="/images/customers/varandas.webp" alt="" />
                    </div>
                    <div className="c-img">                        
                        <img src="/images/customers/dutra_ipiranga.webp" alt="" />
                    </div>
                    <div className="c-img">
                        <img src="/images/customers/lojasmm.webp" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}