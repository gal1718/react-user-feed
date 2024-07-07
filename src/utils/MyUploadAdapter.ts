// src/utils/MyUploadAdapter.ts

class MyUploadAdapter {
    private loader: any;

    constructor(loader: any) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file
            .then((file: File) => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve({
                        default: reader.result as string
                    });
                };
                reader.onerror = (error) => {
                    reject(error);
                };
                reader.readAsDataURL(file);
            }));
    }

    abort() {
        // No need to implement abort functionality as we are reading the file locally
    }
}

export default MyUploadAdapter;
