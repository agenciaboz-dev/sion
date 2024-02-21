import React, { useState } from "react"
import { Avatar, Box, Button, CircularProgress, Skeleton, SxProps, TextField } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined"
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"
import CloudCircleOutlinedIcon from "@mui/icons-material/CloudCircleOutlined"
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined"
import FileUploadIcon from "@mui/icons-material/FileUpload"
import { api } from "../../../api"
import { useFormik } from "formik"
import { useSnackbar } from "burgos-snackbar"
import Dropzone from "react-dropzone"
import { useConfirmDialog } from "burgos-confirm"
import "./style.scss"

interface CustomerFormProps {}

export const CustomerForm: React.FC<CustomerFormProps> = ({}) => {
    const location = useLocation()
    const customer = location.state?.customer as Customer | undefined
    const navigate = useNavigate()
    const isNewCustomer = !customer
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)
    // const [editing, setEditing] = useState(false)
    const { snackbar } = useSnackbar()
    const [hover, setHover] = useState(false)
    const formik = useFormik<customerForm>({ initialValues: customer || { image: "" }, onSubmit: (values) => onSubmit(values) })
    const { confirm } = useConfirmDialog()

    const skeleton_style = { width: "100%", height: "15vw" }
    const upload_icon_style: SxProps = {
        width: "30%",
        height: "auto",
        color: "white",
    }

    async function onSubmit(values: customerForm) {
        try {
            console.log(values)
            setLoading(true)
            const response = customer ? await api.patch("/customers", { id: customer.id, image: values.image }) : await api.post("/customers", values)
            setLoading(false)
            navigate(-1)
        } catch (error) {
            console.log(error)
            setLoading(false)
            snackbar({ severity: "error", text: "Erro ao criar imagem de cliente" })
        }
    }

    async function deleteCustomerImage() {
        try {
            const userConfirmed = window.confirm("Tem certeza de que deseja excluir esta imagem?")
            if (!userConfirmed) {
                return
            }
            setDeleting(true)
            const response = await api.delete("/customers", { data: { id: customer?.id } })
            setDeleting(false)
            navigate(-1)
        } catch (error) {
            console.log(error)
            setDeleting(false)
            snackbar({ severity: "error", text: "Erro ao excluir imagem de cliente" })
        }
    }

    const fileHandler = async (file: File) => {
        if (loading) return

        confirm({
            title: "Atualizar imagem",
            content: "Tem certeza de que deseja alterar essa imagem?",
            onConfirm: async () => {
                setLoading(true)
                const formData = new FormData()
                const data = { id: customer?.id }

                formData.append("data", JSON.stringify(data))
                formData.append("file", file)
                setLoading(true)
                const response = customer ? await api.patch("/customers", formData) : await api.post("/customers", formData)
                setLoading(false)

                navigate(-1)
            },
        })
    }

    return (
        <div>
            <form style={{ display: "contents" }} onSubmit={formik.handleSubmit}>
                <Box>
                    <Box
                        sx={{
                            flexDirection: "column",
                        }}
                    >
                        <p>Arraste ou selecione um arquivo:</p>
                        <Dropzone onDrop={(acceptedFiles) => fileHandler(acceptedFiles[0])}>
                            {({ getRootProps, getInputProps }) => (
                                <div
                                    {...getRootProps()}
                                    className="image-container"
                                    onMouseEnter={() => setHover(true)}
                                    onMouseLeave={() => setHover(false)}
                                >
                                    <input {...getInputProps()} />
                                    {!customer && <Avatar sx={{ borderRadius: "0", height: "20vw", width: "20vw" }} />}
                                    {customer && <Avatar src={customer.image} sx={{ borderRadius: "0", height: "20vw", width: "20vw" }} />}
                                    {loading && <Skeleton variant="rectangular" sx={skeleton_style} />}
                                    <div className="icon-container" style={{ opacity: hover ? 1 : 0 }}>
                                        <FileUploadIcon sx={upload_icon_style} />
                                    </div>
                                    <div className="backdrop-overlay" style={{ opacity: hover ? 1 : 0 }}></div>
                                </div>
                            )}
                        </Dropzone>
                    </Box>

                    <Box
                        sx={{
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            padding: "2vw",
                            gap: "2vw",
                        }}
                    >
                        <Box
                            sx={{
                                alignItems: "center",
                                gap: "1vw",
                            }}
                        >
                            <p>Ou insira uma URL:</p>
                            <TextField value={formik.values.image} name="image" onChange={formik.handleChange} />
                        </Box>
                        <Box sx={{ gap: "2vw", justifyContent: "center" }}>
                            <Button
                                sx={{ flexDirection: "column", textTransform: "unset", color: "black" }}
                                onClick={() => navigate(`/dashboard/customers_images`)}
                            >
                                <ArrowCircleLeftOutlinedIcon sx={{ width: "4vw", height: "4vw", color: "#737373" }} />
                                <p>Voltar</p>
                            </Button>
                            {!isNewCustomer && (
                                <Button sx={{ flexDirection: "column", textTransform: "unset", color: "black" }} onClick={deleteCustomerImage}>
                                    {deleting ? (
                                        <CircularProgress size={"4vw"} />
                                    ) : (
                                        <CancelOutlinedIcon sx={{ width: "4vw", height: "4vw", color: "#99143C" }} />
                                    )}
                                    <p>Excluir</p>
                                </Button>
                            )}
                            {/* {!isNewCustomer && (
                                    <Button sx={{ flexDirection: "column", textTransform: "unset", color: "black" }} onClick={() => setEditing(!editing)}>
                                        <CloudCircleOutlinedIcon sx={{ width: "4vw", height: "4vw", color: "#384974" }} />
                                        <p>Editar</p>
                                    </Button>
                                )} */}
                            <Button type="submit" sx={{ flexDirection: "column", textTransform: "unset", color: "black" }}>
                                {loading ? (
                                    <CircularProgress size={"4vw"} />
                                ) : (
                                    <CheckCircleOutlinedIcon sx={{ width: "4vw", height: "4vw", color: "#559F55" }} />
                                )}
                                Salvar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </form>
        </div>
    )
}
