import React, { useState, useEffect } from 'react'
import { Button, message, Upload, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import config from './config';
import './image-field.css';

export default ({ onChange = null, value = '', disabled = false, uploadPath = 'gallery', maxBytes = 0 }: any) => {
  const [imageUrl, setImageUrl] = useState('');
  const $t: any = (window as any).$t ? (window as any).$t : (text: string) => text;
  useEffect(() => {
    setImageUrl(value);
  });
  return (
    <div className="widegts-image-field">
      <Upload {...config.genUploadProps({
        uploadPath,
        maxBytes,
        onUploadCompleted: (imageObj: any) => {
          setImageUrl(imageObj.imageUrl);
          if (onChange) onChange(imageObj.imageUrl);
        },
        onMessage: (msg: any, type: any) => {
          if (type === 'error') {
            message.error(msg);
          } else {
            message.info(msg);
          }
        }
      })}>
        {!disabled && <Button><UploadOutlined />{$t('Upload')}</Button>}
      </Upload>
      {imageUrl && <div className="upload-image" onClick={()=>{
        Modal.info({
          icon: null,
          maskClosable: true,          
          content: <img alt="" src={imageUrl} className="img-large"/>,
          closable: true,
          okText: '关闭',
          width: 800,
        });
      }} >{<img alt="" src={imageUrl} />}</div>}
    </div>
  )
};