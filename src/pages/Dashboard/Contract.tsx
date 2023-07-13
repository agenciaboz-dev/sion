import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Skeleton, SxProps, TextField, Box, LinearProgress, IconButton, Tooltip } from "@mui/material"
import { useApi } from "../../hooks/useApi"
import MaskedInput from "react-text-mask"
import CircleIcon from "@mui/icons-material/Circle"
import RepeatOnIcon from "@mui/icons-material/RepeatOn"
import { MuiLoading } from "../../components/MuiLoading"
import { Modal } from "../../components/Modal"
import { useSign } from "../../hooks/useSign"
import useMeasure from "react-use-measure"
import { useColors } from "../../hooks/useColors"
import { api } from "../../api"
import { Button } from "@mui/material"
import "./style.scss"
import { useCepMask, usePhoneMask, useCpfMask, useCnpjMask } from "burgos-masks"
import { Document, Page, pdfjs } from "react-pdf"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js`

interface ContractProps {}

export const Contract: React.FC<ContractProps> = ({}) => {
    const id = useParams().id
    const navigate = useNavigate()
    const apio = useApi()

    const [contract, setContract] = useState<Contract>()
    const [loading, setLoading] = useState(false)
    const [ref, { width }] = useMeasure()
    const [pages, setPages] = useState<number[]>([])

    const skeleton_style: SxProps = {
        width: "100%",
        flexShrink: 0,
    }

    const textfield_style = {
        padding: "0vw",
    }

    const style = {
        width: "1vw",
        color: !contract?.active && !contract?.reproved ? "yellow" : contract.active && !contract.archived ? "green" : "red",
    }

    const handleReplaceSeller = () => {
        return <Modal />
    }

    const onLoadSuccess = (pdf: any) => {
        setLoading(false)
        setPages([...Array(pdf.numPages)].map((_, index) => index + 1))
    }

    useEffect(() => {
        console.log(contract)
    }, [contract])

    useEffect(() => {
        if (!id) navigate("/dashboard/contracts")

        apio.contracts.find.id({
            data: { id },
            callback: (response: { data: Contract }) => setContract(response.data),
        })
    }, [])

    return id ? (
        <div className="Contract-Component">
            {!contract ? (
                <>
                    <Skeleton variant="rectangular" sx={skeleton_style} height={"21vw"} />
                    <Skeleton variant="rectangular" sx={skeleton_style} height={"8vw"} />
                    <Skeleton variant="rectangular" sx={skeleton_style} height={"5vw"} />
                </>
            ) : (
                <>
                    <Button
                        onClick={() => navigate("/dashboard/contracts")}
                        variant="outlined"
                        sx={{
                            position: "absolute",
                            right: "4.25vw",
                            top: "3vw",
                            fontSize: "1vw",
                            padding: "0.5vw 2vw 0.25vw",
                        }}
                    >
                        Voltar
                    </Button>
                    <div
                        style={{
                            gap: "1vw",
                            boxShadow: "none",
                            display: "flex",
                            justifyContent: "flex-end",
                            padding: "0",
                        }}
                    >
                        <TextField
                            sx={{ width: "8vw" }}
                            variant="standard"
                            label={"ID"}
                            value={contract.id}
                            InputProps={{ readOnly: true, sx: textfield_style }}
                        />

                        <TextField
                            sx={{ width: "13vw" }}
                            variant="standard"
                            label="Status"
                            value={contract.status?.name}
                            InputProps={{
                                readOnly: true,
                                startAdornment: <CircleIcon sx={style} />,
                                sx: { gap: "0.5vw" },
                            }}
                        />
                    </div>
                    <div className="info-container">
                        <div className="left-column">
                            <b>Informações</b>
                            {contract.cnpj && (
                                <TextField
                                    label={"Razão Social titular da Unidade Consumidora"}
                                    value={contract.company}
                                    InputProps={{ readOnly: true, sx: textfield_style }}
                                />
                            )}

                            <TextField
                                label={"Nome do Responsável Legal"}
                                value={contract.name}
                                InputProps={{ readOnly: true, sx: textfield_style }}
                            />

                            {contract.cpf && <TextField label={"RG"} value={contract.rg} InputProps={{ readOnly: true, sx: textfield_style }} />}
                            <MaskedInput
                                mask={useCpfMask}
                                value={contract.cnpj || contract.cpf}
                                guide={false}
                                render={(ref, props) => (
                                    <TextField
                                        inputRef={ref}
                                        {...props}
                                        label={contract.cnpj ? "CNPJ" : "CPF"}
                                        InputProps={{ readOnly: true, sx: textfield_style }}
                                    />
                                )}
                            />

                            <TextField
                                label={"E-mail do representante"}
                                value={contract.email}
                                InputProps={{ readOnly: true, sx: textfield_style }}
                            />
                            <div style={{ gap: "1vw" }}>
                                {contract.cpf && (
                                    <TextField
                                        label={"Data de Nascimento"}
                                        value={new Date(contract.birth).toLocaleDateString()}
                                        InputProps={{ readOnly: true, sx: textfield_style }}
                                    />
                                )}
                                <MaskedInput
                                    mask={usePhoneMask}
                                    value={contract.phone}
                                    guide={false}
                                    render={(ref, props) => (
                                        <TextField
                                            inputRef={ref}
                                            {...props}
                                            label={"Telefone"}
                                            InputProps={{ readOnly: true, sx: textfield_style }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="right-column">
                            <b>Endereço</b>
                            <div style={{ gap: "1vw" }}>
                                <MaskedInput
                                    mask={useCepMask}
                                    value={contract.cep}
                                    guide={false}
                                    render={(ref, props) => (
                                        <TextField inputRef={ref} {...props} label={"CEP"} InputProps={{ readOnly: true, sx: textfield_style }} />
                                    )}
                                />
                                <TextField label={"UF"} value={contract.state} InputProps={{ readOnly: true, sx: textfield_style }} />
                            </div>
                            <TextField label={"Cidade"} value={contract.city} InputProps={{ readOnly: true, sx: textfield_style }} />
                            <TextField label={"Endereço"} value={contract.address} InputProps={{ readOnly: true, sx: textfield_style }} />
                            <div className="number-district">
                                <TextField
                                    label={"Número"}
                                    value={contract.number}
                                    sx={{ width: "30%" }}
                                    InputProps={{ readOnly: true, sx: textfield_style }}
                                />
                                <TextField
                                    label={"Bairro"}
                                    value={contract.district}
                                    sx={{ width: "70%" }}
                                    InputProps={{ readOnly: true, sx: textfield_style }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="unit-container">
                        <b>Unidades consumidoras</b>
                        <TextField
                            sx={{ width: "100%" }}
                            label={"Distribuidora Atual"}
                            value={contract.supplier}
                            InputProps={{ readOnly: true, sx: textfield_style }}
                        />

                        <TextField
                            sx={{ width: "100%" }}
                            label={"Unidade Consumidora"}
                            value={contract.unit}
                            InputProps={{ readOnly: true, sx: textfield_style }}
                        />
                        <div style={{ gap: "1vw" }}>
                            {contract.subunits &&
                                contract.subunits.split(", ").map((subunit, index) => (
                                    <React.Fragment key={index}>
                                        <TextField
                                            sx={{ width: "50%", marginRight: 0 }}
                                            label={"Subunidade"}
                                            value={subunit}
                                            InputProps={{ readOnly: true, sx: textfield_style }}
                                        />
                                        {/* {(index + 1) % 2 === 0 && <br />} */}
                                    </React.Fragment>
                                ))}
                        </div>
                    </div>

                    <div className="seller-container">
                        <div className="text">
                            <p>Vendedor responsável</p>
                            <h1>{contract.seller.name}</h1>
                        </div>

                        <div style={{ alignItems: "center", gap: "1vw" }}>
                            <h2 style={{ fontWeight: "normal" }}>Data de início: {new Date(contract.date).toLocaleDateString()}</h2>
                            <Tooltip title="Trocar de Vendedor">
                                <IconButton sx={{ flexDirection: "column" }} onClick={handleReplaceSeller}>
                                    <RepeatOnIcon color="primary" sx={{ width: "2.5vw", height: "2.5vw" }} />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>

                    <Box className="Contract-Page" ref={ref} sx={{ alignItems: "center", gap: "1vw" }}>
                        {contract ? (
                            <>
                                <Document
                                    file={`https://app.agenciaboz.com.br:4000/${contract.filename}`}
                                    onLoadSuccess={onLoadSuccess}
                                    onLoadError={(error) => console.error(error)}
                                    //className={"document-container"}
                                    loading={<LinearProgress sx={{ width: width - width * 0.03 }} />}
                                >
                                    {pages.map((page, index) => (
                                        <Page
                                            key={index}
                                            pageNumber={page}
                                            renderForms={false}
                                            width={width - width * 0.03}
                                            renderTextLayer={false}
                                            renderAnnotationLayer={false}
                                        />
                                    ))}
                                </Document>
                            </>
                        ) : (
                            <MuiLoading color={"primary"} size={"15vw"} />
                        )}
                    </Box>
                </>
            )}
        </div>
    ) : (
        <></>
    )
}
