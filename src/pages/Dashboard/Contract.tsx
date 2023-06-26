import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Contract as ContractType } from "../../definitions/contract"
import { Skeleton, SxProps, TextField } from "@mui/material"
import { useApi } from "../../hooks/useApi"
import MaskedInput from "react-text-mask"
import CircleIcon from "@mui/icons-material/Circle"

import { MuiLoading } from "../../components/MuiLoading"
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

    const [contract, setContract] = useState<ContractType>()
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
            callback: (response: { data: ContractType }) => setContract(response.data),
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
                            value={
                                !contract?.active && !contract?.reproved
                                    ? "Aguardando"
                                    : contract.active && !contract.archived
                                    ? "Ativo"
                                    : "Reprovado"
                            }
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

                            {contract.cpf && (
                                <TextField
                                    label={"RG"}
                                    value={contract.rg}
                                    InputProps={{ readOnly: true, sx: textfield_style }}
                                />
                            )}
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
                                        <TextField
                                            inputRef={ref}
                                            {...props}
                                            label={"CEP"}
                                            InputProps={{ readOnly: true, sx: textfield_style }}
                                        />
                                    )}
                                />
                                <TextField
                                    label={"UF"}
                                    value={contract.state}
                                    InputProps={{ readOnly: true, sx: textfield_style }}
                                />
                            </div>
                            <TextField
                                label={"Cidade"}
                                value={contract.city}
                                InputProps={{ readOnly: true, sx: textfield_style }}
                            />
                            <TextField
                                label={"Endereço"}
                                value={contract.address}
                                InputProps={{ readOnly: true, sx: textfield_style }}
                            />
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
                        <div style={{ gap: "1vw" }}>
                            <TextField
                                sx={{ width: "50%" }}
                                label={"Unidade Consumidora"}
                                value={contract.unit}
                                InputProps={{ readOnly: true, sx: textfield_style }}
                            />
                            <TextField
                                sx={{ width: "50%" }}
                                label={"Distribuidora Atual"}
                                value={contract.supplier}
                                InputProps={{ readOnly: true, sx: textfield_style }}
                            />
                        </div>
                    </div>

                    <div className="seller-container">
                        <div className="text">
                            <p>Vendedor responsável</p>
                            <h1>{contract.seller.name}</h1>
                        </div>

                        <h2 style={{ fontWeight: "normal" }}>
                            Data de início: {new Date(contract.date).toLocaleDateString()}
                        </h2>
                    </div>

                    <div className="Contract-Page" ref={ref}>
                        {contract ? (
                            <>
                                <Document
                                    file={`https://app.agenciaboz.com.br:4000/${contract.filename}`}
                                    onLoadSuccess={onLoadSuccess}
                                    onLoadError={(error) => console.error(error)}
                                    className={"document-container"}
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
                                            <MuiLoading color={"primary"} size={"15vw"} />
                                        </div>
                                    }
                                >
                                    {pages.map((page, index) => (
                                        <Page key={index} pageNumber={page} renderForms={false} width={width} />
                                    ))}
                                </Document>
                            </>
                        ) : (
                            <MuiLoading color={"primary"} size={"15vw"} />
                        )}
                    </div>
                </>
            )}
        </div>
    ) : (
        <></>
    )
}
