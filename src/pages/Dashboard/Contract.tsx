import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Contract as ContractType } from "../../definitions/contract"
import { Skeleton, SxProps, TextField } from "@mui/material"
import { useApi } from "../../hooks/useApi"

interface ContractProps {}

export const Contract: React.FC<ContractProps> = ({}) => {
    const id = useParams().id
    const navigate = useNavigate()
    const api = useApi()

    const [contract, setContract] = useState<ContractType>()
    const [loading, setLoading] = useState(false)

    const skeleton_style: SxProps = {
        width: "100%",
        flexShrink: 0,
    }

    const textfield_style = {
        padding: "0vw",
    }

    useEffect(() => {
        if (!id) navigate("/dashboard/contracts")

        api.contracts.find.id({
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
                    <div className="info-container">
                        <div className="left-column">
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
                            <TextField
                                label={contract.cnpj ? "CNPJ" : "CPF"}
                                value={contract.cnpj || contract.cpf}
                                InputProps={{ readOnly: true, sx: textfield_style }}
                            />
                            <TextField
                                label={"E-mail do representante"}
                                value={contract.email}
                                InputProps={{ readOnly: true, sx: textfield_style }}
                            />
                        </div>
                        <div className="right-column">
                            <TextField
                                label={"Telefone"}
                                value={contract.phone}
                                InputProps={{ readOnly: true, sx: textfield_style }}
                            />
                            <TextField
                                label={"CEP"}
                                value={contract.cep}
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

                    <div className="seller-container">
                        <div className="text">
                            <p>Vendedor responsável</p>
                            <h1>{contract.seller.name}</h1>
                        </div>

                        <h2 style={{ fontWeight: "normal" }}>
                            Data de início: {new Date(contract.date).toLocaleDateString()}
                        </h2>
                    </div>
                </>
            )}
        </div>
    ) : (
        <></>
    )
}
