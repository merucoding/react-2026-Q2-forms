export const fileToBase64 = (file: unknown): Promise<string> => {
  return new Promise((resolve, reject) => {
    const actualFile =
      file instanceof FileList
        ? file.item(0)
        : file instanceof File
          ? file
          : null;

    if (!actualFile) {
      reject(new Error('No file provided'));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Invalid file reader result'));
      }
    };
    reader.onerror = reject;

    reader.readAsDataURL(actualFile);
  });
};
