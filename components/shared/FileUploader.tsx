'use client'

import { useCallback, Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import { CloudUpload } from 'lucide-react'
import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'

import { Button } from '@/components/ui/button'
import { convertFileToUrl } from '@/lib/utils'

export function FileUploader({ imageUrl, onFieldChange, setFiles }: {
  imageUrl: string,
  onFieldChange: (url: string) => void,
  setFiles: Dispatch<SetStateAction<File[]>>
}) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  })

  return (
    <div {...getRootProps()} className="flex justify-center items-center bg-gray-50 h-64 cursor-pointer flex-col overflow-hidden rounded-lg">
      <input {...getInputProps()} className='cursor-pointer bg-transparent' />

      {imageUrl ? (
        <div className='flex h-full w-full flex-1 justify-center'>
          <Image
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className='w-full object-cover object-center'
          />
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center py-5 text-gray-500'>
          <CloudUpload size={48} />
          <h3 className='my-2'>Drag photo here</h3>
          <p className='mb-4'>SVG, PNG, or JPG</p>
          <Button type='button' className=' bg-gray-500 rounded-full'>Select from computer</Button>
        </div>
      )}
    </div>
  )
}