declare namespace _default {
    function genUploadProps({ onUploadCompleted, onMessage, debug, uploadUrl, type, maxBytes, uploadPath }: {
        onUploadCompleted: any;
        onMessage: any;
        debug?: boolean | undefined;
        uploadUrl?: any;
        type?: string | undefined;
        maxBytes?: number | undefined;
        uploadPath?: string | undefined;
    }): {
        name: string;
        action: any;
        data: {
            path: string;
        };
        showUploadList: boolean;
        beforeUpload: (file: any) => boolean;
        onChange(resp: any): void;
    };
}
export default _default;
