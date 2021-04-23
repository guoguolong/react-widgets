import React, { useState, useEffect, useRef } from 'react'
import { Button, message, Upload, Modal } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import config from './config';
import './image-field.css';

export default ({ onChange = null, value = '', disabled = false, uploadPath = 'gallery', maxBytes = 0 }: any) => {
  const [imageUrl, setImageUrl] = useState('');
  const actionRef:any = useRef();

  const $t: any = (window as any).$t ? (window as any).$t : (text: string) => text;

  useEffect(() => {
    setImageUrl(value);
  });

  const uploadButton:any = !disabled ? (
    <div className="actions" ref={actionRef} >
      <div className="button"><PlusOutlined /> {$t('重传')} </div>
      <div className="button" onClick={(e: any)=>{
        e.stopPropagation();
        setImageUrl('');
        if (onChange) onChange('');        
      }}><MinusOutlined /> {$t('删除')} </div>
    </div>
  )
  : '';
  
  const uploadButtonDefault:any = !disabled ? (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>{$t('Upload')}</div>
      </div>
    ): '';

  return (
    <div className="omc-widegts-image-field" onMouseOver={()=>{
      if(actionRef && actionRef.current) actionRef.current.style.display = 'flex';
    }} onMouseOut={()=>{
      if(actionRef && actionRef.current) actionRef.current.style.display = 'none';
    }}>
      <Upload 
        className="image-uploader"
        listType="picture-card"
        {...config.genUploadProps({
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
        {imageUrl ? <><img src={imageUrl} alt="上传的图片" style={{ width: '100%' }} onClick={(e: any)=>{
          e.stopPropagation();
          Modal.info({
            icon: null,
            maskClosable: true,          
            content: <img alt="" src={imageUrl} className="img-large"/>,
            closable: true,
            okText: '关闭',
            width: 800,
          });
        }}/>
        {uploadButton}
        </>
       : <div>{uploadButtonDefault}</div>
       }
      </Upload>      
    </div>
  )
};