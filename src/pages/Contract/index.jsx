import { useEffect, useState } from 'react';
import { api } from '../../api';
import { Document, Page, pdfjs } from 'react-pdf'
import { MuiLoading } from '../../components/MuiLoading';
import { useNavigate, useParams } from 'react-router-dom';
import './style.scss';
import { useColors } from '../../hooks/useColors';
import useMeasure from 'react-use-measure';
import { Button } from '@mui/material';
import FileSaver from 'file-saver';
import { useSign } from "../../hooks/useSign"

export const Contract = ({}) => {
  const NavPdf = () => {
    const [disabledDownload, setDisabledDownload] = useState(!signatures.includes("sion"))
    const [disabledSign, setDisabledSign] = useState(!canSign(signing, signatures))

    const button_style = {
      backgroundColor: colors.primary,
      color: "white",
      width: "8vw",
      height: "8vw",
      justifyContent: "center",
      alignItems: "center",
    }

    return (
      <div style={{ position: "fixed", gap: "5vw", bottom: "5vw" }}>
        <Button
          disabled={disabledDownload}
          variant="contained"
          sx={{ backgroundColor: "white", color: colors.primary }}
          onClick={() => FileSaver.saveAs(url, contract.filename.split(contract.unit + "/")[1])}
        >
          Baixar
        </Button>
        <Button disabled={disabledSign} variant="contained" onClick={() => navigate("/sign/" + contract.id + "/" + signing)}>
          Assinar
        </Button>
      </div>
    )
  }

  const id = useParams().id
  const signing = useParams().signing
  const colors = useColors()
  const navigate = useNavigate()
  const [ref, { width }] = useMeasure()
  const { canSign } = useSign()

  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState([])
  const [url, setUrl] = useState("")
  const [contract, setContract] = useState(null)
  const [signatures, setSignatures] = useState([])

  const onLoadSuccess = (pdf) => {
    setLoading(false)
    setPages([...Array(pdf.numPages)].map((_, index) => index + 1))
  }

  useEffect(() => {
    if (contract) {
      console.log(contract)
      setUrl(api.getUri().split("/api")[0] + "/" + contract.filename)
      setSignatures(contract.signatures?.split(",") || [])
    }
  }, [contract])

  useEffect(() => {
      api.post("/contract", { id })
          .then((response) => setContract(response.data))
          .catch((error) => console.error(error))
  }, [])

  return (
      <div className="Contract-Page" ref={ref} style={{ justifyContent: !contract && "center" }}>
          {contract ? (
              <>
                  <Document
                      file={url}
                      onLoadSuccess={onLoadSuccess}
                      onLoadError={(error) => console.error(error)}
                      loading={
                          <div
                              style={{
                                  width: "100vw",
                                  height: "100vh",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                              }}
                          >
                              <MuiLoading color={"primary"} size={"15vw"} noData={""} />
                          </div>
                      }
                  >
                      {pages.map((page, index) => (
                          <Page key={index} pageNumber={page} renderForms={false} width={width} />
                      ))}
                  </Document>
                  <NavPdf />
              </>
          ) : (
              <MuiLoading color={"primary"} size={"15vw"} />
          )}
      </div>
  )
}