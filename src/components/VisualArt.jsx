import { useEffect, useRef, useState, Component } from "react";
import { Box, Typography, ImageList, ImageListItem } from "@mui/material";
import bio from "../assets/bio";

const VisualArt = ({ itemData, size }) => {
  const [filteredByTag, setFilteredByTag] = useState();

  const [selectedImage, setSelectedImage] = useState();
  const [zoom, setZoom] = useState(false);

  const visibleTags = ["TouchDesigner"];

  const boxRef = useRef(null);

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
  const handleSelectImage = (item) => {
    setSelectedImage(item);
    setZoom(false);
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
    }
  }, [itemData]);

  return (
    // RENDER TAG COLUMNS VIEW

    <Box className="main-flex">
      <Box
        className="box-tag"
        sx={{
          width: selectedImage ? (size.width > 700 ? "25%" : "100%") : size.width > 700 ? "50%" : "100%",
          height: "105%",
          cursor: selectedImage ? "pointer" : "zoom-in",
        }}
        ref={boxRef}
      >
        <ImageList variant="masonry" cols={1} gap={5}>
          {filteredByTag &&
            filteredByTag.map((item, index) => (
              <ImageListItem key={index} onClick={() => handleSelectImage(item)}>
                <img srcSet={`${item.img.original}`} src={`${item.img.original}`} alt={item.img.title} loading="lazy" />
              </ImageListItem>
            ))}
        </ImageList>
      </Box>

      {/* big photo container - rendered on WEB and only when a picture is selected */}

      {size.width > 700 && selectedImage && (
        <Box className="photo-info-container">
          <Box className="visual-info">
            <Typography align="left">{bio.visualArt}</Typography>
            <Typography align="left" sx={{ marginTop: "50px" }}>
              {selectedImage.details.description && `Info: ${selectedImage.details.description}`}
            </Typography>
          </Box>
          <Box className="big-photo-container-works">
            {/* conditionally renderes big image clicked */}
            {size.width > 700 && (
              <img
                className={zoom === false ? "image-big" : "image-big-zoom-works"}
                style={{ marginLeft: " auto", marginRight: "auto", cursor: zoom === true ? "zoom-out" : "zoom-in" }}
                onClick={handleClickZoom}
                srcSet={`${selectedImage.img.original}`}
                src={`${selectedImage.img.original}`}
                loading="lazy"
              />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default VisualArt;
