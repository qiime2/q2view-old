import React from 'react';
import Dropzone from 'react-dropzone';

const dropStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    width: 'auto',
    height: '200px',
    margin: '15px 0px 30px 0px',
    borderStyle: 'dashed',
    borderRadius: '5px',
    borderWidth: 'medium',
    borderColor: '#999',
    color: '#999',
    cursor: 'pointer',
    backgroundColor: '#f8f8f8',
    boxShadow: '5px 5px 5px #999'
};

const onDropStyle = {
    ...dropStyle,
    borderStyle: 'solid',
    color: 'rgba(0, 0, 0, 0)'
};

export default ({ submit }) => (
    <Dropzone
        style={dropStyle} activeStyle={onDropStyle} disablePreview multiple={false}
        accept=".qza,.qzv" onDrop={submit}
    >
        <div style={{ fontSize: '18px' }}>
            <h1 style={{ marginTop: '10px' }}>Drag and drop or click here</h1>
            to view a QIIME 2 Artifact or Visualization (.qza/.qzv) from your computer.
        </div>
    </Dropzone>
);
