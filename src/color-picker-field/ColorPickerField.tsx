import React, { useState, useEffect } from 'react'
// @ts-ignore
import { PhotoshopPicker } from 'react-color';

const styles: any = {
  popover: {
    position: 'absolute',
    zIndex: '200',
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  },
  swatch: {
    display: 'inline-block',
    background: '#FFF',
    border: '1px solid gray',
    width: '20px',
    height: '20px',
    marginBottom: '2px',
    marginRight: '2px',
  },
  swatchContainer: {
    display: 'flex',
  }
};

export default ({ value = '', disabled = false, onChange }: any) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [colors, setColors]: any = useState(null);
  const [color, setColor] = useState('#FFF');
  const [swatch, setSwatch] = useState(styles.swatch);

  useEffect(() => {
    setSwatch({ ...swatch, background: '#' + value })
    setColor('#' + value)
  }, [value]);

  const handleClose = () => {
    setDisplayColorPicker(false);
  }
  return (
    <div className="color-picker-field" style={styles.colorPickerField}>
      <div style={styles.swatchContainer}>
        <span style={swatch} onClick={() => {
          if (!disabled)
            setDisplayColorPicker(!displayColorPicker);
        }}></span>
        {value && <span>{value.toLocaleUpperCase()} </span>}
      </div>

      {displayColorPicker ?
        <div style={styles.popover}>
          {/* <div style={styles.cover} onClick={handleClose}></div> */}
          <PhotoshopPicker color={color} onChange={(colors: any) => {
            setColor(colors.hex);
            setColors(colors);
            // if (onChange && colors?.hex) onChange(colors.hex.slice(1));
          }} onAccept={(color: any) => {
            if (onChange && colors?.hex) onChange(colors.hex.slice(1));
            setDisplayColorPicker(false);
          }} onCancel={(color: any) => {
            setDisplayColorPicker(false);
          }} />
        </div>
        : null}
    </div >
  )
};