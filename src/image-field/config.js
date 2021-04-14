function popupMessage({ msg, onMessage, type = 'error', debug = false }) {
  if (msg) {
    if (onMessage) onMessage(msg, type);
    if (debug) console[type]('[DEBUG] Image Upload:', msg);
  }
}

export default {
  genUploadProps: ({ onUploadCompleted, onMessage, debug = false, uploadUrl = null, type = 'image', maxBytes = 0, uploadPath = 'gallery' }) => {
    return {
      name: 'file',
      action: uploadUrl || '/file/upload',
      data: { path: uploadPath },
      showUploadList: false,
      beforeUpload: file => {
        if (type === 'video') {
          if (file.type !== 'video/mp4') {
            popupMessage({ msg: 'is not a valid video file', type: 'error', onMessage, debug })
            return false;
          }
        } else {
          if (file.type !== 'image/png'
            && file.type !== 'image/jpeg'
            && file.type !== 'image/x-png'
            && file.type !== 'image/pjpeg'
            && file.type !== 'image/svg+xml') {
            popupMessage({ msg: '不是有效的图片文件', type: 'error', onMessage, debug })
            return false;
          } else {
            if (maxBytes > 0) {
              if (file.size > maxBytes) {
                let sizeLabel = maxBytes;
                if (maxBytes >= 1024 && maxBytes < (1024 * 1024) ) {
                  sizeLabel = (maxBytes / 1024) + 'K';
                } else if (maxBytes >= (1024 * 1024) ) {
                  sizeLabel = Math.floor(maxBytes / 1024 / 1024) + 'M';
                } else {
                  sizeLabel = maxBytes; 
                }

                popupMessage({ msg: `图片文件尺寸不能超过${sizeLabel}B`, type: 'error', onMessage, debug });
                return false;
              }
            }
          }
        }
        return true;
      },
      onChange(resp) {
        if (resp.file.status === 'done') {
          const { fileUrl, width, height } = resp.file.response.data;
          onUploadCompleted({
            imageUrl: fileUrl,
            width,
            height,
            name: resp.file.name
          });
        } else if (resp.file.status === 'error') {
          popupMessage({ msg: '图片上传失败，请重新操作', type: 'error', onMessage, debug })
        }
      }
    }
  }
}