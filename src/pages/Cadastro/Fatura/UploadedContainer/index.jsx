import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dropzone from 'react-dropzone';
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

    const onDrop = (acceptedFiles) => {
        setAttachments({...attachments, [identifier]: acceptedFiles})
    }

    const FileContainer = ({ file }) => {

        return (
            <div className="file-container">
                <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <button>Escolher arquivo</button>
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
            {files?.map(file => <FileContainer key={file.name} file={file} />)}
        </div>
    )
}