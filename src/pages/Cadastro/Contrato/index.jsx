import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import { MuiLoading } from '../../../components/MuiLoading';
import { useClient } from '../../../hooks/useClient';
import { useContract } from '../../../hooks/useContract';
import {ReactComponent as ChoseIcon} from '../../../images/blue_check.svg'
import './style.scss';
import { usePdf } from '../../../hooks/usePdf';
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import COLORS from '../../../sass/_colors.scss'
import { NavButtons } from '../NavButtons';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export const Contrato = ({  }) => {

    const NavPdf = () => {
        const button_style = {
            backgroundColor: COLORS.primary,
            color: 'white',
            width: '3vw',
            height: '4vw',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '4vw',
            cursor: 'pointer'
        }

        const nextPage = () => {
            if ((page+1) <= pages) setPage(page+1)
        }

        const previousPage = () => {
            if ((page-1) > 0) setPage(page-1)
        }

        return (
            <div className="pdf-bottom" style={{fontSize: '1.5vw',width: '100%',justifyContent: 'space-between'}}>
                <div className="back-button" style={button_style} onClick={previousPage}>
                    <p>{'<'}</p>
                </div>
                <p>{page} / {pages}</p>
                <div className="next-button" style={button_style} onClick={nextPage}>
                    <p>{'>'}</p>
                </div>
            </div>
        )
    } 


    const navigate = useNavigate()
    const client = useClient()

    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(0)
    const [contract, setContract] = useState(null)

    const nextStage = () => {
        api.post("/contract/send", client.value).then((response) => console.log(response.data))
        navigate("/cadastro/financeiro")
    }

    const onLoadSuccess = (pdf) => {
        setLoading(false)
        setPages(pdf.numPages)
    }

    useEffect(() => {
        if (!client?.value?.unit) navigate("/cadastro")

        api.post("/contract", { id: client.value.id })
            .then((response) => setContract(response.data))
            .catch((error) => console.error(error))

        // console.log(pdf)
    }, [])

    return (
        <div className="Contrato-Component">
            <div className="main-container">
                <div className="title-container">
                    <h1>Cadastrado!</h1>
                    <ChoseIcon style={{ height: "2.5vw", width: "2.5vw" }} />
                </div>
                <div className="description-container">
                    <p>Clique avançar para enviar o contrato por email para todos os envolvidos cadastrados!</p>
                </div>
                {contract ? (
                    <>
                        <Document
                            file={api.getUri().split("/api")[0] + "/" + contract.filename}
                            onLoadSuccess={onLoadSuccess}
                            onLoadError={(error) => console.error(error)}
                            error={<MuiLoading color={"primary"} size={"5vw"} />}
                            loading={<MuiLoading color={"primary"} size={"5vw"} />}
                        >
                            <Page pageNumber={page} /*width={800}*/ renderInteractiveForms={false} />
                        </Document>
                        <NavPdf />
                    </>
                ) : (
                    <MuiLoading color={"primary"} size={"5vw"} />
                )}
            </div>
            <NavButtons goBack={() => navigate("/cadastro/anexos")} nextStage={nextStage} children={<p>Enviar</p>} />
        </div>
    )
}