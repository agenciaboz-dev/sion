import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    Skeleton,
    SxProps,
    TextField,
    Box,
    LinearProgress,
    IconButton,
    Tooltip,
    Checkbox,
    CircularProgress,
    FormControlLabel,
} from "@mui/material"
import { useApi } from "../../hooks/useApi"
import MaskedInput from "react-text-mask"
import CircleIcon from "@mui/icons-material/Circle"
import RepeatOnIcon from "@mui/icons-material/RepeatOn"
import { MuiLoading } from "../../components/MuiLoading"
import useMeasure from "react-use-measure"
import { useUser } from "../../hooks/useUser"
import { Button, Modal } from "@mui/material"
import "./style.scss"
import { useCepMask, usePhoneMask, useCpfMask, useCnpjMask } from "burgos-masks"
import { Document, Page, pdfjs } from "react-pdf"
import { useSellers } from "../../hooks/useSellers"
import { DataGrid, GridColDef, GridFooter, GridPagination, GridRowsProp } from "@mui/x-data-grid"
import { useSnackbar } from "burgos-snackbar"
import { useContracts } from "../../hooks/useContracts"
import { SearchField } from "../../components/SearchField"
import { useDate } from "../../hooks/useDate"
import DownloadIcon from "@mui/icons-material/Download"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js`

interface ContractProps {}

export const Contract: React.FC<ContractProps> = ({}) => {
    const id = useParams().id
    const navigate = useNavigate()
    const api = useApi()
    const contracts = useContracts()
    const fernanda = useSellers().list.find((user) => user.username == "fernanda")
    const sellers = useSellers()

    const { user } = useUser()
    const { getDateString } = useDate()

    const [contract, setContract] = useState<Contract>()
    const [loading, setLoading] = useState(false)
    const [ref, { width }] = useMeasure()
    const [pages, setPages] = useState<number[]>([])
    const [open, setOpen] = useState(false)
    const [sellerList, setSellerList] = useState<User[]>(sellers.list)
    const [selectedSeller, setSelectedSeller] = useState<number | null>(null)
    const [updateSellerLoading, setUpdateSellerLoading] = useState(false)
    const [searching, setSearching] = useState(false)
    const [signatures, setSignatures] = useState<string[]>([])

    const onSearch = (value: string) => {
        setSearching(!!value)

        const searchResult = sellers.list.filter((seller) => seller.name.toLowerCase().includes(value))
        setSellerList(searchResult)
    }

    useEffect(() => {
        if (!searching) {
            setSellerList(sellers.list)
        }
    }, [sellers.list])

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

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleReplaceSeller = () => {
        handleOpen()
    }

    const handleSellerUpdate = (selectedSeller: any) => {
        setUpdateSellerLoading(true)
        api.contracts.update.seller({
            data: { contract, seller_id: selectedSeller },
            callback: (response: { data: Contract }) => {
                setContract(response.data)
                contracts.update(response.data)
            },
            finallyCallback: () => setUpdateSellerLoading(false),
        })
    }

    const SellerList = ({ sellers }: { sellers: User[] }) => {
        const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, sellerId: number) => {
            if (event.target.checked) {
                setSelectedSeller(sellerId)
            } else {
                setSelectedSeller(null)
            }
        }

        const columns: GridColDef[] = [
            {
                field: "option",
                headerName: "Selecione",
                width: 100,
                renderCell: (params) => (
                    <Checkbox
                        checked={params.value === selectedSeller}
                        onChange={(event) => handleCheckboxChange(event, params.value as number)}
                        color="primary"
                        disabled={params.row.sellerId === contract?.seller_id}
                    />
                ),
            },
            {
                field: "id",
                headerName: "ID",
                width: 100,
                editable: false,
                renderCell: (params) => (
                    <>
                        <div style={{ flexDirection: "column" }}>
                            {params.row.sellerId !== contract?.seller_id ? (
                                <div>{params.row.id}</div>
                            ) : (
                                <div style={{ color: "gray" }}>{params.row.id}</div>
                            )}
                        </div>
                    </>
                ),
            },
            {
                field: "name",
                headerName: "Nome",
                width: 500,
                renderCell: (params) => (
                    <>
                        <div style={{ flexDirection: "column" }}>
                            {params.row.sellerId !== contract?.seller_id ? (
                                <div>{params.row.name}</div>
                            ) : (
                                <div style={{ color: "gray" }}>{params.row.name}</div>
                            )}

                            {params.row.sellerId === contract?.seller_id && (
                                <div style={{ color: "red", fontSize: "0.7vw" }}>Vendedor atual</div>
                            )}
                        </div>
                    </>
                ),
            },
            {
                field: "contracts",
                headerName: "Contratos",
                width: 100,
                renderCell: (params) => (
                    <>
                        <div style={{ flexDirection: "column" }}>
                            {params.row.sellerId !== contract?.seller_id ? (
                                <div>{params.row.contracts}</div>
                            ) : (
                                <div style={{ color: "gray" }}>{params.row.contracts}</div>
                            )}
                        </div>
                    </>
                ),
            },
        ]

        const rows: GridRowsProp = sellers.map((seller) => ({
            option: seller.id,
            id: seller.id,
            name: seller.name,
            contracts: seller.contracts.length,
            sellerId: seller.id,
        }))

        const getRowClassName = (params: any) => {
            if (params.row.sellerId === contract?.seller_id) {
                return "disabled-row"
            }
            return ""
        }

        const selectedSellerName = selectedSeller ? sellers.find((seller) => seller.id === selectedSeller)?.name : ""
        const detinationSeller = selectedSeller == contract?.seller_id ? true : false

        console.log({ sellerSource: contract?.seller.name, sellerDestination: selectedSellerName, detinationSeller })

        const customLocaleText = {
            noRowsLabel: "Nenhum registro encontrado",
        }

        return (
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    columns={columns}
                    key={selectedSeller}
                    rows={rows}
                    disableRowSelectionOnClick
                    getRowClassName={getRowClassName}
                    localeText={customLocaleText}
                    componentsProps={{
                        noRowsOverlay: {
                            style: {
                                width: "110vw",
                            },
                        },
                    }}
                />
            </div>
        )
    }

    const onLoadSuccess = (pdf: any) => {
        setLoading(false)
        setPages([...Array(pdf.numPages)].map((_, index) => index + 1))
    }

    useEffect(() => {
        console.log(contract)
        if (contract) {
            setSignatures(contract.signatures?.split(","))
        }
    }, [contract])

    useEffect(() => {
        if (!id) navigate("/dashboard/contracts")

        api.contracts.find.id({
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

                            {contract.cpf && (
                                <TextField
                                    label={"RG"}
                                    value={contract.rg != null ? contract.rg : ""}
                                    InputProps={{ readOnly: true, sx: textfield_style }}
                                />
                            )}
                            <MaskedInput
                                mask={contract.cnpj ? useCnpjMask : useCpfMask}
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
                                        value={getDateString(contract.birth, true)}
                                        InputProps={{ readOnly: true, sx: textfield_style }}
                                    />
                                )}
                                <MaskedInput
                                    mask={usePhoneMask}
                                    value={contract.phone}
                                    guide={false}
                                    render={(ref, props) => (
                                        <TextField
                                            sx={{ width: "50%" }}
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

                    <Box sx={{ flexDirection: "column" }}>
                        <p style={{ fontWeight: "bold" }}>Assinaturas</p>
                        <Box sx={{ gap: "2vw" }}>
                            <FormControlLabel
                                label={contract.name}
                                control={<Checkbox checked={signatures?.includes("client")} />}
                            />
                            <FormControlLabel
                                label={fernanda?.name}
                                control={<Checkbox checked={signatures?.includes("seller")} />}
                            />
                            <FormControlLabel label={"Sion"} control={<Checkbox checked={signatures?.includes("sion")} />} />
                        </Box>
                    </Box>

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
                                contract.subunits.split(",").map((subunit, index) => (
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
                    <div
                        style={{
                            width: "100%",
                            gap: "1vw",
                            padding: "2vw",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <h4>Contato Financeiro</h4>
                        <div style={{ gap: "1vw" }}>
                            <TextField
                                sx={{ width: "100%" }}
                                label={"Login"}
                                value={contract.financial?.login || ""}
                                InputProps={{ readOnly: true, sx: textfield_style }}
                            />
                            <TextField
                                sx={{ width: "100%" }}
                                label={"Senha"}
                                value={contract.financial?.password || ""}
                                InputProps={{ readOnly: true, sx: textfield_style }}
                            />
                        </div>
                    </div>

                    <div className="seller-container">
                        <div className="text">
                            <p>Usuário responsável</p>
                            <h1>{contract.seller.name}</h1>
                        </div>

                        <div style={{ alignItems: "center", gap: "1vw" }}>
                            <h2 style={{ fontWeight: "normal" }}>Data de início: {getDateString(contract.date, true)}</h2>
                            <Tooltip title="Trocar usuário">
                                <IconButton sx={{ flexDirection: "column" }} onClick={handleReplaceSeller}>
                                    <RepeatOnIcon color="primary" sx={{ width: "2.5vw", height: "2.5vw" }} />
                                </IconButton>
                            </Tooltip>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        width: 900,
                                        bgcolor: "background.paper",
                                        boxShadow: 24,
                                        p: 4,
                                        padding: "2vw",
                                        borderRadius: "0.5vw",
                                        flexDirection: "column",
                                        gap: "1vw",
                                    }}
                                >
                                    <Box
                                        sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
                                    >
                                        <h3>Escolha um usuário</h3>

                                        <SearchField
                                            onChange={onSearch}
                                            loading={sellers.loading}
                                            sx={{
                                                "& .MuiInputBase-root": {
                                                    height: "1.6vw",
                                                    width: "15vw",
                                                    borderRadius: "20vw",
                                                },
                                                "& .MuiInputBase-input": {
                                                    padding: "0 12px",
                                                    fontSize: "0.8vw",
                                                },
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": {
                                                        borderColor: "#384974",
                                                    },
                                                    "&:hover fieldset": {
                                                        borderColor: "#384974",
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "#384974",
                                                        borderWidth: "0.11vw",
                                                    },
                                                },
                                            }}
                                        />
                                    </Box>

                                    <SellerList sellers={sellerList.filter((seller) => seller.name)} />
                                    {user!.adm && (
                                        <div
                                            className="buttons-container"
                                            style={{ gap: "1vw", justifyContent: "flex-end" }}
                                        >
                                            <Button onClick={handleClose} variant="outlined">
                                                Cancelar
                                            </Button>
                                            <Button onClick={() => handleSellerUpdate(selectedSeller)} variant="contained">
                                                {updateSellerLoading ? (
                                                    <CircularProgress size={"1.5rem"} sx={{ color: "white" }} />
                                                ) : (
                                                    "Alterar"
                                                )}
                                            </Button>
                                        </div>
                                    )}
                                </Box>
                            </Modal>
                        </div>
                    </div>
                    <Box>
                        <a
                            href={`https://app.agenciaboz.com.br:4000/${contract.filename}`}
                            download={`${contract.filename}`}
                            target="_blank"
                        >
                            <Button
                                sx={{
                                    alignSelf: "flex-start",
                                    borderRadius: "1vw",
                                    padding: " 0 0vw",
                                    gap: "0.6vw",
                                    color: "black",
                                }}
                            >
                                <DownloadIcon />
                                <h1>Baixar Contrato</h1>
                            </Button>
                        </a>
                    </Box>
                    <Box className="Contract-Page" ref={ref} sx={{ alignItems: "center", gap: "1vw", width: "100%" }}>
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
