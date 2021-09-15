import PropTypes from 'prop-types';
import { ImageArea } from './ImageDetailsArea.styles.js';

const ImageDetailsArea = ({ content }) => {
  return (
    <ImageArea>
      <img src={content} alt="Uploaded content" />
    </ImageArea>
  );
};

ImageDetailsArea.propTypes = {
  content: PropTypes.string.isRequired,
};

export default ImageDetailsArea;
