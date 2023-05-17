import React, { useState } from "react";
import ReactImageAnnotate from "react-image-annotate";

const ImageAnnotationTool = ({ imageUrl, regionClsList }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  console.log(regionClsList);

  const images = imageUrl.map((url) => ({ src: url }));

  const handleNextImage = () => {
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    const newSelectedIndex = (selectedIndex - 1) % images.length;
    setSelectedIndex(newSelectedIndex >= 0 ? newSelectedIndex : 0);
  };

  const handleExit = (mainLayoutState) => {
    console.log(mainLayoutState.images);
  };

  return (
    <ReactImageAnnotate
      labelImages
      regionClsList={regionClsList}
      images={images}
      selectedImage={selectedIndex}
      onNextImage={handleNextImage}
      onPrevImage={handlePrevImage}
      enabledTools={["create-box", "create-polygon", "create-point"]}
      onExit={handleExit}
    />
  );
};

export default ImageAnnotationTool;
