'use client'
import Upload from "./Upload"

import { uploadFileImage } from "@/app/(protected-pages)/announcements-management/actions"


const Uploader = ({
    onUploading,
    onUploadResult
}: {
    onUploadResult: (newFileId: string) => void
    onUploading: (uploading: boolean) => void
}) => {
    const maxUpload = 1

    const beforeUpload = (files: FileList | null, fileList: File[]) => {
        let valid: string | boolean = true

        const allowedFileType = ['image/jpeg', 'image/png']
        const maxFileSize = 1048576

        if (fileList.length >= maxUpload) {
            return `Solo se admite ${maxUpload} fichero`
        }

        if (files) {
            for (const f of files) {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'Solo se admiten imágenes png o jpg!'
                }

                if (f.size >= maxFileSize) {
                    valid = 'No se admiten ficheros con tamaño superior a 1 MB!'
                }
            }
        }

        return valid
    }

    const tip = <p className="mt-2">jpeg o png (max 1 MB)</p>

    return (
        <div>
            <Upload
                beforeUpload={beforeUpload}
                onFileRemove={() => onUploadResult('')}
                uploadLimit={maxUpload}
                tip={tip}
                showList={true}
                onChange={async (value) => {
                    onUploading(true)
                    const formData = new FormData();
                    formData.append('files', value[0]);
                    const response = await uploadFileImage(formData);

                    const { success, data } = response
                    onUploading(false)
                    if (success) {
                        const { ids } = data
                        onUploadResult(ids[0])
                    }
                    else {
                        onUploadResult('')
                    }

                }}

            />
        </div>
    )
}

export default Uploader

