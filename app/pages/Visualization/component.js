import React from 'react';


const style = {
    width: '100%',
    height: '100%',
    position: 'absolute',
};

const titleChange = () => {
  const frameTitle = document.querySelector('iframe').contentDocument.title;
  if (frameTitle) {
    document.title = `QIIME 2 View: ${frameTitle}`;
  } else {
    document.title = 'QIIME 2 View';
  }
}

export default ({ iframeURL }) => (
    <iframe
      frameBorder="0"
      src={ iframeURL }
      style={ style }
      onLoad={ titleChange }
    ></iframe>
)
