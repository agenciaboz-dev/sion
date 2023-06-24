import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dropzone from 'react-dropzone';
import { DashedPlusBox } from '../../../../components/DashedPlusBox';
import { useAttachments } from '../../../../hooks/useAttachments';
import COLORS from '../../../../sass/_colors.scss'

export const UploadedContainer = ({ files, setCurrentAttachments, identifier }) => {

    const [attachments, setAttachments] = useAttachments()

    const removeFile = (file) => {
        setCurrentAttachments(files.filter(item => {
            console.log({item, file})
            return item.name != file.name
        }))
    }

    const addFile = (acceptedFiles) => {
        setCurrentAttachments([...files, ...acceptedFiles])
    }

    const replaceFile = (acceptedFiles, file) => {
        setCurrentAttachments([...files.filter(item => item.name != file.name), ...acceptedFiles])
    }

    const FileContainer = ({ file }) => {

        return (
            <div className="file-container">
                <Dropzone onDrop={acceptedFiles => replaceFile(acceptedFiles, file)}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <button>Escolher outro arquivo</button>
                    </div>
                    </section>
                )}
                </Dropzone>
                <p>{file.name}</p>
                <DeleteForeverIcon onClick={() => removeFile(file)} sx={{color: COLORS.primary}} />
            </div>
        )
    }
    
    return (
        <div className='uploaded-container' >
            <h1>Anexar {identifier}</h1>
            {files?.map(file => <FileContainer key={file.name} file={file} />)}
            <Dropzone onDrop={acceptedFiles => addFile(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
                <section>
                <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    <DashedPlusBox onClick={() => null} />
                </div>
                </section>
            )}
            </Dropzone>
        </div>
    )
}