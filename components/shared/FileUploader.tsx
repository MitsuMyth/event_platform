'use client';

import { useCallback, Dispatch, SetStateAction } from 'react';
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from 'uploadthing/client';

import { Button } from '@/components/ui/button';
import { convertFileToUrl } from '@/lib/utils';

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({ imageUrl, onFieldChange, setFiles }: FileUploaderProps) {
  // Updated onDrop function to handle regular File[] instead of FileWithPath[]
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Update the file state
    setFiles(acceptedFiles);

    // Convert first file to a URL and trigger the onFieldChange callback
    if (acceptedFiles.length > 0) {
      onFieldChange(convertFileToUrl(acceptedFiles[0]));
    }
  }, [onFieldChange, setFiles]);

  // Configure the dropzone with file acceptance options
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(['image/*']), // Accept only image files
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center">
          <img
            src={imageUrl}
            alt="uploaded image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex-center flex-col py-5 text-grey-500">
          <img src="/assets/icons/upload.svg" width={77} height={77} alt="file upload icon" />
          <h3 className="mb-2 mt-2">Drag photo here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}

