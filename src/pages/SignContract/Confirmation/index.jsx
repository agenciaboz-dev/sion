import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    useMediaQuery,
} from "@mui/material"
import { Form, Formik } from "formik"
import Dropzone from "react-dropzone"
import { useParams } from "react-router"
import MaskedInput from "react-text-mask"
import { useDocumentMask } from "../../../hooks/useDocumentMask"
import { useCallback, useEffect, useRef, useState } from "react"
import { api } from "../../../api"
import { ReactComponent as CameraIcon } from "../../../images/camera.svg"
import { useUser } from "../../../hooks/useUser"
import { SafeEnvironment } from "../SafeEnvironment"
import ReactSignatureCanvas from "react-signature-canvas"
import useMeasure from "react-use-measure"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { useColors } from "../../../hooks/useColors"
import Stack from '@mui/material/Stack';
import LinearProgress from "@mui/material/LinearProgress"

export const Confirmation = ({ setOpenSnackbar, setError, setStage, setContract }) => {
    const [attachments, setAttachments] = useState([])
    const [loading, setLoading] = useState(false)
    const [rubricModal, setRubricModal] = useState(false)
    const [rubric, setRubric] = useState("")
    const [progressBarValue, setProgressBarValue] = useState(0)

    const params = useParams()
    const [user, setUser] = useUser()
    const [ref, { width }] = useMeasure()
    const colors = useColors()

    const signatureRef = useRef(null)
    const isMobile = useMediaQuery("(orientation: portrait)")

    const documentMask = useDocumentMask()

    const initialValues = {
        name: "",
        document: "",
        birth: "",
    }

    const handleSubmit = (values) => {
        if (loading) return
        if (!rubric && (user?.adm || !user)) {
            setOpenSnackbar(true)
            setError("Rúbrica obrigatória")
            return
        }

        const birthDate = values.birth.split("/")
        if (
            Number(birthDate[0]) < 1 ||
            Number(birthDate[0]) > 31 ||
            Number(birthDate[1]) < 1 ||
            Number(birthDate[1]) > 12 ||
            Number(birthDate[2]) < 1920 ||
            Number(birthDate[2]) > new Date().getFullYear()
        ) {
            setOpenSnackbar(true)
            setError("Data de nascimento inválida")
            return
        }

        setLoading(true)
        setProgressBarValue(0)
        const formData = new FormData()
        const data = {
            ...values,
            id: params.id,
            signing: params.signing,
            user,
            rubric,
            birth: values.birth.split("/").reverse().join("-"),
        }
        console.log({ data })

        formData.append("data", JSON.stringify(data))

        // Assuming you have the files in the `attachments` state
        if (attachments[0]) {
            attachments.map((file) => {
                formData.append("biometria", file)
            })
        } else {
            setOpenSnackbar(true)
            setError("Foto obrigatória")
            setLoading(false)
            return
        }

        api.post("/contract/confirm", formData)
            .then((response) => {
                const contract = response.data
                if (!contract) {
                    setOpenSnackbar(true)
                    setError("Dados inválidos")
                } else {
                    if (contract.signed) {
                        setStage(3)
                    } else {
                        setContract(contract)
                        setStage(2)
                    }
                }
            })
            .finally(() => setLoading(false))
            .catch((error) => console.error(error))

        setTimeout(() => {
            setLoading(false)
        }, 10000)
    }

    const onDrop = (acceptedFiles) => {
        setAttachments(acceptedFiles)
    }

    const finishRubric = () => {
        setRubric(signatureRef.current.getTrimmedCanvas().toDataURL())
        setRubricModal(false)
    }

    const cancelRubric = () => {
        setRubric("")
        setRubricModal(false)
    }

    const handleSignature = () => {
        const signature = signatureRef.current
        if (signature.isEmpty()) {
            setOpenSnackbar(true)
            setError("Rúbrica obrigatória")
            return
        }

        console.log(signature.toDataURL())
        return signature.toDataURL()
    }

    useEffect(() => {
        console.log(attachments)
    }, [attachments])

    useEffect(() => {
        const progressBar = setInterval(() => {
            setProgressBarValue(progressBarValue + 1)
            //console.log({progressBarValue})
        }, 100)

        return () => clearInterval(progressBar)
    }, [progressBarValue])

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, handleChange }) => (
                <Form ref={ref}>
                    <h3>Confirme seus dados</h3>
                    <TextField label="Nome Completo" name="name" value={values.name} onChange={handleChange} fullWidth required />
                    <MaskedInput
                        mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
                        name={"document"}
                        onChange={handleChange}
                        value={values.document}
                        guide={false}
                        render={(ref, props) => (
                            <TextField inputRef={ref} {...props} label="CPF" inputProps={{ inputMode: "numeric" }} fullWidth required />
                        )}
                    />
                    <MaskedInput
                        mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                        name="birth"
                        value={values.birth}
                        onChange={handleChange}
                        guide={false}
                        render={(ref, props) => (
                            <TextField
                                inputRef={ref}
                                {...props}
                                label="Data de nascimento"
                                inputProps={{ inputMode: "numeric" }}
                                fullWidth
                                required
                            />
                        )}
                    />

                    <Dropzone onDrop={(acceptedFiles) => onDrop(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()} className="dropzone">
                                    <input {...getInputProps()} />
                                    {attachments[0] ? (
                                        <div className="uploaded-container">
                                            <h3>{attachments[0].name}</h3>
                                        </div>
                                    ) : (
                                        <div className="upload-container">
                                            <CameraIcon />
                                            <h3>Clique aqui para {isMobile ? "tirar" : "subir"} uma foto</h3>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    <h3>Rúbrica</h3>
                    {rubric ? (
                        <img style={{ height: isMobile ? "30vw" : "5vw" }} onClick={() => setRubricModal(true)} src={rubric} alt="" />
                    ) : (
                        <Button variant="contained" onClick={() => setRubricModal(true)}>
                            Clique aqui para rubricar
                        </Button>
                    )}
                    {(rubric || !(params.signing != "seller")) && (
                        <Button variant="contained" type="submit">
                            {loading ? <CircularProgress size={"1.5rem"} color="secondary" /> : "Avançar"}
                        </Button>
                    )}
                    {loading && (
                        <>
                            <LinearProgress variant="determinate" value={progressBarValue} />
                            <p style={{ fontWeight: "bold", color: colors.primary }}>Fazendo upload...</p>
                        </>
                    )}
                    <SafeEnvironment />

                    <Dialog open={rubricModal} onClose={() => setRubricModal(false)} style={{ flexDirection: "column" }}>
                        <DialogTitle style={{ alignSelf: "center" }}>Desenhar sua assinatura</DialogTitle>
                        <DialogContent
                            style={{ flexDirection: "column" }}
                            sx={{ border: "1px dashed black", margin: isMobile ? "0 3vw" : "0", position: "relative" }}
                        >
                            <div
                                className="clear-rubric"
                                onClick={() => signatureRef.current.clear()}
                                style={{ position: "absolute", right: 0, top: 0, color: colors.primary }}
                            >
                                <p>Apagar</p>
                                <DeleteForeverIcon sx={{ color: colors.red }} />
                            </div>
                            <div
                                style={{
                                    position: "absolute",
                                    width: width * 0.75,
                                    height: width * 0.4,
                                    // border: "2px dashed " + colors.red,
                                    top: (width * 0.8 - width * 0.4) / 2,
                                    left: (width * 0.8 - width * 0.685) / 2,
                                    pointerEvents: "none",
                                }}
                            ></div>
                            <ReactSignatureCanvas
                                penColor="black"
                                ref={signatureRef}
                                canvasProps={{ width: width * 0.8, height: width * 0.8, className: "sigCanvas" }}
                            />
                        </DialogContent>
                        <DialogActions sx={{ justifyContent: "center" }}>
                            <Button onClick={cancelRubric} sx={{ flex: 1 }} variant="outlined">
                                Cancelar
                            </Button>
                            <Button onClick={finishRubric} sx={{ flex: 1 }} variant="contained">
                                Assinar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Form>
            )}
        </Formik>
    )
}
