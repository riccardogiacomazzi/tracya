import { useEffect, useRef, useState, Component } from "react";
import { Box, Button, Typography, ImageList, ImageListItem } from "@mui/material";
import bio from "../../assets/bio";
import P5Wrapper from "../../assets/P5Wrapper";
import sketchVisual from "../../assets/sketchVisual";
import "./VisualArt.css";

const VisualArt = ({ itemData, size }) => {
  const [filteredByTag, setFilteredByTag] = useState();

  const [descriptionVisible, setDescriptionVisible] = useState();

  const [selectedImage, setSelectedImage] = useState();
  const [zoom, setZoom] = useState(false);

  const visibleTags = ["TouchDesigner"];

  const boxRef = useRef(null);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  //scroll on top automatically on render, and when Index of album displayed is changed
  const triggerScrollTop = () => {
    if (boxRef.current) {
      boxRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    triggerScrollTop();
  }, []);

  //selection of image to display
  const handleSelectImage = (item, index) => {
    setSelectedImage(item);
    setZoom(false);

    const updatedDescription = [...descriptionVisible];

    if (updatedDescription[index]) {
      updatedDescription[index] = false;
    } else {
      updatedDescription.fill(false);
      updatedDescription[index] = true;
    }

    // Update the state
    setDescriptionVisible(updatedDescription);
  };

  //zoom for main image
  const handleClickZoom = () => {
    setZoom(!zoom);
  };

  // new feature description & img filtering

  useEffect(() => {
    if (itemData && itemData.length > 0) {
      const filterItemData = itemData.filter((item) => visibleTags.some((tag) => item.tag.includes(tag)));
      setFilteredByTag(filterItemData);
      setDescriptionVisible(filterItemData.map((item) => false));
    }
  }, [itemData]);

  return (
    // RENDER TAG COLUMNS VIEW

    <Box className="main-flex">
      <Box
        className="box-tag"
        sx={{
          width: selectedImage ? (size.width > 768 ? "25%" : "100%") : size.width > 768 ? "50%" : "100%",
          height: "105%",
          cursor: selectedImage ? "pointer" : "zoom-in",
        }}
        ref={boxRef}
      >
        {filteredByTag && (
          <ImageList variant="masonry" cols={1} gap={5}>
            {filteredByTag.map((item, index) => (
              <ImageListItem key={index} onClick={() => handleSelectImage(item, index)}>
                {/* MOBILE - RENDER TEXT ON CLICK + P5 BACKGROUND */}
                <div className="visual-info-mobile">
                  {descriptionVisible[index] && (
                    <div className="p5wrapper">
                      <P5Wrapper sketch={sketchVisual} />
                    </div>
                  )}
                  {/* {size.width < 768 && descriptionVisible[index] && item.details.description && (
                    <div className="text">
                      <Typography align="center" sx={{ padding: "10px" }}>
                        {item.details.description}
                      </Typography>
                    </div>
                  )} */}
                </div>

                <img srcSet={`${item.img.large}`} src={`${item.img.large}`} alt={item.img.title} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>

      {/* big photo container - rendered on WEB and only when a picture is selected */}
      {size.width > 768 && selectedImage && (
        <Box className="photo-info-container">
          <Box className="visual-info">
            <Typography align="left">{bio.visualArt}</Typography>
            <Typography align="left" sx={{ marginTop: "50px" }}>
              {selectedImage.details.description && `Info: ${selectedImage.details.description}`}
            </Typography>
          </Box>
          <Box className="big-photo-container-works">
            {/* conditionally renderes big image clicked */}
            {size.width > 768 && (
              <img
                className={zoom === false ? "image-big" : "image-big-zoom-works"}
                style={{ marginLeft: " auto", marginRight: "auto", cursor: zoom === true ? "zoom-out" : "zoom-in" }}
                onClick={handleClickZoom}
                srcSet={`${selectedImage.img.original}`}
                src={`${selectedImage.img.original}`}
                loading="lazy"
                onLoad={handleImageLoad}
              />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default VisualArt;
