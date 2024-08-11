import { useEffect, useRef, useState, Component } from "react";
import { Box, Button, Typography, ImageList, ImageListItem } from "@mui/material";
import bio from "../assets/bio";

const VisualArt = ({ itemData, size }) => {
  const [indexShow, setIndexShow] = useState({ min: 0, max: 1 });
  const [selectedImage, setSelectedImage] = useState();
  const [zoom, setZoom] = useState(false);
  const [imageLoad, setImageLoad] = useState([]);

  const visibleTags = ["TouchDesigner"];

  const boxRef = useRef(null);

  const uniqueTags = itemData.reduce((tags, item) => {
    item.tag.forEach((tag) => {
      if (!tags.includes(tag) && visibleTags.includes(tag)) {
        tags.push(tag);
      }
    });
    return tags;
  }, []);

  const itemByTag = [];

  uniqueTags.forEach((tag) => {
    const filteredItems = itemData.filter((item) => item.tag.includes(tag));
    const images = filteredItems.map((item) => item.img);
    itemByTag.push({ tag: tag, img: images });
  });

  //scroll on top automatically on render, and when Index of album displayed is changed
  const triggerScrollTop = () => {
    if (boxRef.current) {
      boxRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    triggerScrollTop();
  }, [indexShow]);

  //selection of image to display
  const handleSelectImage = (item) => {
    if (!selectedImage) {
      setZoom(true);
    } else setZoom(false);
    setSelectedImage(item);
  };

  //zoom for main image
  const handleClickZoom = () => {
    setZoom(!zoom);
  };

  return (
    // RENDER TAG COLUMNS VIEW

    <Box className="main-flex">
      {itemByTag.slice(indexShow.min, indexShow.max).map((item, index) => {
        return (
          <Box
            key={index}
            className="box-tag"
            sx={{
              width: selectedImage ? (size.width > 700 ? "25%" : "100%") : size.width > 700 ? "50%" : "100%",
              height: "105%",
              cursor: selectedImage ? "pointer" : "zoom-in",
            }}
            ref={boxRef}
          >
            <ImageList variant="masonry" cols={1} gap={5}>
              {item.img.map((img, index) => (
                <ImageListItem key={index} onClick={() => handleSelectImage(img)}>
                  <img srcSet={`${img.original}`} src={`${img.original}`} alt={img.title} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        );
      })}

      {/* big photo container - rendered on WEB and only when a picture is selected */}
      {size.width > 700 && selectedImage && (
        <Box className="photo-info-container">
          <Box className="visual-info">
            <Typography align="left">{bio.visualArt}</Typography>
          </Box>
          <Box
            className="big-photo-container-works"
            sx={{
              cursor: zoom === true ? "zoom-out" : "zoom-in",
            }}
          >
            {/* conditionally renderes big image clicked */}
            {size.width > 700 && (
              <img
                className={zoom === false ? "image-big" : "image-big-zoom-works"}
                style={{ marginLeft: " auto", marginRight: "auto" }}
                onClick={handleClickZoom}
                srcSet={`${selectedImage.original}`}
                src={`${selectedImage.original}`}
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
