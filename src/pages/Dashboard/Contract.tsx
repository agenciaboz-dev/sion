import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Contract as ContractType } from "../../definitions/contract"
import { Skeleton, SxProps, TextField } from "@mui/material"
import { useApi } from "../../hooks/useApi"
import MaskedInput from "react-text-mask"
import CircleIcon from "@mui/icons-material/Circle"

import { useCepMask, usePhoneMask, useCpfMask, useCnpjMask } from "burgos-masks"

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
    console.log(contract)

    const style = {
        width: "1vw",
        color: !contract?.active && !contract?.reproved ? "yellow" : contract.active && !contract.archived ? "green" : "red",
    }
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
                                label={"Fornecedor"}
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
                    <div>
                        <b>Contrato</b>
                    </div>
                </>
            )}
        </div>
    ) : (
        <></>
    )
}
