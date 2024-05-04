import cloudinary, {
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';

export const upload = (
  file: string,
  publicId: string,
  overwrite: boolean,
  invalidate: boolean
): Promise<UploadApiErrorResponse | UploadApiResponse | undefined> => {
  try {
    const uploadPromise = cloudinary.v2.uploader.upload(file, {
      public_id: publicId,
      resource_type: 'auto',
      invalidate,
      overwrite,
    }) as Promise<UploadApiResponse>;
    return uploadPromise;
  } catch (error) {
    return error as Promise<UploadApiErrorResponse>;
  }
};

export const videoUpload = (
  file: string,
  publicId?: string,
  overwrite?: boolean,
  invalidate?: boolean
) => {
  try {
    const uploadPromise = cloudinary.v2.uploader.upload(file, {
      public_id: publicId,
      resource_type: 'video',
      invalidate,
      overwrite,
      chunk_size: 7000000,
    }) as Promise<UploadApiResponse>;
    return uploadPromise;
  } catch (error) {
    return error as Promise<UploadApiErrorResponse>;
  }
};
