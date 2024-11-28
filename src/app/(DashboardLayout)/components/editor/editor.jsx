'use client';
import * as fabric from 'fabric';
import React, { useState, useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid2';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { MuiColorInput } from 'mui-color-input';
import { styled } from '@mui/material/styles';
import {
  ToastContainer,
  toast
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

function onObjectSelected(o) {
  console.log(o);
  // const { selected } = o;
  // const { type } = selected[0];
  // console.log(type);
}

function renderIcon(ctx, left, top, _styleOverride, fabricObject) {
  const deleteIcon =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

  var deleteImg = document.createElement('img');
  deleteImg.src = deleteIcon;

  const size = this.cornerSize;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
  ctx.restore();
}

// const urlMap = {
//     VT323: "url(https://fonts.gstatic.com/s/vt323/v17/pxiKyp0ihIEF2isfFJXUdVNF.woff2)",
//     Pacifico:
//         "url(https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2)",
//     Lato100:
//         "url(https://fonts.gstatic.com/s/lato/v24/S6u8w4BMUTPHh30AXC-qNiXg7Q.woff2)",
//     Lato900:
//         "url(https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh50XSwiPGQ3q5d0.woff2)",
// };

// const fontVT323 = new FontFace("VT323", urlMap.VT323, {
//     style: "normal",
//     weight: "normal",
// });

function deleteObject(_eventData, transform) {
  const canvas = transform.target.canvas;
  canvas.remove(transform.target);
  canvas.requestRenderAll();
}

const addRect = (canvi) => {
  const rect = new fabric.Rect({
    height: 150,
    width: 150,
    fill: '#e00606'
  });
  rect.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon,
    cornerSize: 24
  });
  canvi.add(rect);
  canvi.renderAll();
};

const addCircle = (canvi) => {
  const circle = new fabric.Circle({
    radius: 100,
    angle: 30,
    fill: '#5038e3'
  });
  circle.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon,
    cornerSize: 24
  });
  canvi.add(circle);
  canvi.renderAll();
};

const addTriangle = (canvi) => {
  const triangle = new fabric.Triangle({
    width: 150,
    height: 100,
    angle: 45,
    fill: '#66e006'
  });
  triangle.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon,
    cornerSize: 24
  });
  canvi.add(triangle);
  canvi.renderAll();
};

const addImage = (canvi, dataUrl) => {
  fabric.FabricImage.fromURL(dataUrl, {
    crossOrigin: 'anonymous'
  }).then((image) => {
    image.scaleToWidth(200);
    image.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: 16,
      cursorStyle: 'pointer',
      mouseUpHandler: deleteObject,
      render: renderIcon,
      cornerSize: 24
    });
    canvi.add(image);
    canvi.setActiveObject(image);
  });
};

const addText = (canvi) => {
  const pacifico = new fabric.Textbox('Correctly loaded Pacifico', {
    left: 50,
    top: 10,
    width: 200,
    fontSize: 60,
    fontFamily: 'Pacifico',
    fill: '#000000'
  });

  pacifico.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon,
    cornerSize: 24
  });
  canvi.add(pacifico);
  canvi.renderAll();
};

function Editor({ user, id }) {
  const canvasRef = useRef(null);
  const [formName, setFormName] = React.useState('Hello');
  const [formPrice, setFormPrice] = React.useState(10000);
  const [formSide, setFormSide] = React.useState(2);
  const [formQuantity, setFormQuantity] = React.useState(50);
  const [formPaperType, setFormPaperType] = React.useState('Mat');
  const [open, setOpen] = React.useState(false);
  const [fontToolbar, setFontToolbar] = React.useState(false);
  const [colorToolbar, setColorToolbar] = React.useState(false);
  const [color, setColor] = React.useState('#ffffff');
  const [formats, setFormats] = React.useState(() => []);
  const [alignment, setAlignment] = React.useState('left');
  const [bgColor, setBgColor] = React.useState('#ffffff');

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
    if (newFormats.includes('bold')) {
      canvasRef.current.getActiveObject().set('fontWeight', 'bold');
    } else {
      canvasRef.current.getActiveObject().set('fontWeight', 'normal');
    }

    if (newFormats.includes('italic')) {
      canvasRef.current.getActiveObject().set('fontStyle', 'italic');
    } else {
      canvasRef.current.getActiveObject().set('fontStyle', '');
    }

    if (newFormats.includes('underlined')) {
      canvasRef.current.getActiveObject().set('underline', true);
    } else {
      canvasRef.current.getActiveObject().set('underline', false);
    }

    canvasRef.current.renderAll();
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    canvasRef.current.getActiveObject().set('textAlign', newAlignment);
    canvasRef.current.renderAll();
  };

  const handleChangeColor = (newValue) => {
    setColor(newValue);
    canvasRef.current.getActiveObject().set('fill', newValue);
    canvasRef.current.renderAll();
  };

  const handleBgChangeColor = (newValue) => {
    setBgColor(newValue);
    canvasRef.current.backgroundColor = newValue;
    canvasRef.current.renderAll();
  };

  useEffect(() => {
    initCanvas();
    return () => canvasRef.current.dispose();
  }, []);

  const initCanvas = async () => {
    canvasRef.current = new fabric.Canvas('canvas', {
      height: 350,
      width: 600,
      backgroundColor: bgColor
    });

    // canvi.on("selection:created", onObjectSelected);
    canvasRef.current.on('selection:created', (obj) => {
      const { selected } = obj;
      const { type, fill } = selected[0];
      console.log('An object has been selected', type);
      setColorToolbar(true);
      setColor(fill);
      setFontToolbar(type == 'textbox' ? true : false);
    });

    canvasRef.current.on('selection:updated', (obj) => {
      const { selected } = obj;
      const { type, fill } = selected[0];
      console.log('You have selected the other object', type);
      setColorToolbar(true);
      setColor(fill);
      setFontToolbar(type == 'textbox' ? true : false);
    });
    canvasRef.current.on('selection:cleared', () => {
      setColorToolbar(false);
      setFontToolbar(false);
    });
    canvasRef.current.renderAll();

    if (id) {
      const data = await fetch(`/api/templates/${id}`, {
        cache: 'no-cache'
      });
      const json = await data.json();
      setFormName(json.template_name);
      setFormPrice(json.price);
      canvasRef.current
        .loadFromJSON(JSON.parse(json.design_object))
        .then((canvas) => canvas.requestRenderAll());
    }

    return canvasRef.current;
    
  };

  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        {user && user.role == 2 && (
          <Card sx={{ mb: 2 }}>
            <CardHeader title="Properties" />
            <CardContent sx={{ pt: 0 }}>
              <Grid container>
                <FormControl
                    fullWidth
                    margin="normal"
                >
                  <InputLabel>Тал</InputLabel>
                  <Select
                    id="side"
                    name="side"
                    value={formSide}
                    onChange={(e) => setFormSide(e.target.value)}
                    label="side"
                  >
                    <MenuItem value="2">2</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  fullWidth
                  margin="normal"
                >
                  <InputLabel>Ширхэг</InputLabel>
                  <Select
                      id="quantity"
                      name="quantity"
                      value={formQuantity}
                      onChange = {
                        (e) => setFormQuantity(e.target.value)
                      }
                      label="quantity"
                  >
                      <MenuItem value="50">50</MenuItem>
                      <MenuItem value="100">100</MenuItem>
                      <MenuItem value="200">200</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                    fullWidth
                    margin="normal"
                >
                  <InputLabel>Цаасны төрөл</InputLabel>
                  <Select
                      id="paper_type"
                      name="paper_type"
                      value={formPaperType}
                      onChange={(e) => setFormPaperType(e.target.value)}
                      label="paper_type"
                  >
                      <MenuItem value="Mat">Матт цаас</MenuItem>
                      <MenuItem value="White">Extra white</MenuItem>
                      <MenuItem value="Matte Gloss">
                          Матт цаас + Матт бүрэлттэй
                      </MenuItem>
                      <MenuItem value="Soft Gloss">
                          Матт цаас + Зөөлөн бүрэлттэй
                      </MenuItem>
                      <MenuItem value="Gloss">
                          Матт цаас + Гялгар бүрэлттэй
                      </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </CardContent>
          </Card>
        )}
        <ToastContainer/>
        <Card>
          <CardHeader title="Toolbar" />
          <CardContent sx={{ pt: 0 }}>
            <ToggleButtonGroup>
              <ToggleButton onClick={() => addRect(canvasRef.current)}>
                <CropSquareIcon />
              </ToggleButton>
              <ToggleButton onClick={() => addCircle(canvasRef.current)}>
                <PanoramaFishEyeIcon />
              </ToggleButton>
              <ToggleButton onClick={() => addTriangle(canvasRef.current)}>
                <ChangeHistoryIcon />
              </ToggleButton>
              <ToggleButton onClick={() => addText(canvasRef.current)}>
                <TextFieldsIcon />
              </ToggleButton>
              <ToggleButton>
                <Button
                  component="label"
                  role={undefined}
                  tabIndex={-1}
                  startIcon={<AddPhotoAlternateIcon />}
                >
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => {
                      var file = event.target.files[0];
                      var reader = new FileReader();
                      reader.onload = function (f) {
                        addImage(canvasRef.current, f.target.result);
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                </Button>
              </ToggleButton>
            </ToggleButtonGroup>

            <Stack direction="column" mt={2} gap={1}>
              <Typography variant="h6">Дэвсгэр өнгө</Typography>
              <ToggleButtonGroup>
                <MuiColorInput
                  format="hex"
                  value={bgColor}
                  onChange={handleBgChangeColor}
                />
              </ToggleButtonGroup>
            </Stack>
            {colorToolbar && (
              <Stack direction="column" mt={2} gap={1}>
                <Typography variant="h6">Өнгө</Typography>
                <ToggleButtonGroup>
                  <MuiColorInput
                    format="hex"
                    value={color}
                    onChange={handleChangeColor}
                  />
                </ToggleButtonGroup>
              </Stack>
            )}
            {fontToolbar && (
              <>
                <Stack direction="column" mt={2} gap={1}>
                  <Typography variant="h6">Текст формат</Typography>
                  <ToggleButtonGroup
                    value={formats}
                    onChange={handleFormat}
                    aria-label="text formatting"
                  >
                    <ToggleButton value="bold" aria-label="bold">
                      <FormatBoldIcon />
                    </ToggleButton>
                    <ToggleButton value="italic" aria-label="italic">
                      <FormatItalicIcon />
                    </ToggleButton>
                    <ToggleButton value="underlined" aria-label="underlined">
                      <FormatUnderlinedIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Stack>
                <Stack direction="column" mt={2} gap={1}>
                  <Typography variant="h6">Текст байрлуулалт</Typography>
                  <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                  >
                    <ToggleButton value="left" aria-label="left aligned">
                      <FormatAlignLeftIcon />
                    </ToggleButton>
                    <ToggleButton value="center" aria-label="centered">
                      <FormatAlignCenterIcon />
                    </ToggleButton>
                    <ToggleButton value="right" aria-label="right aligned">
                      <FormatAlignRightIcon />
                    </ToggleButton>
                    <ToggleButton value="justify" aria-label="justify">
                      <FormatAlignJustifyIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Stack>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid size={8}>
        <Card>
          <Grid
            container
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{ pr: 3.8, pl: 3.8, pt: 2, pb: 2 }}
          >
            {user && user.role == 1 ? (
              <Grid container spacing={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  value={formName}
                  label="Загварын нэр"
                  onChange={(e) => setFormName(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  size="small"
                  type="number"
                  value={formPrice}
                  label="Үнэ"
                  onChange={(e) => setFormPrice(e.target.value)}
                />
              </Grid>
            ) : ( () => {
                const calculatePrice = () => {
                  const quantityMultiplier = Number(formQuantity) / 50;
                  const materialMultiplier = formPaperType === "Mat" ? 1 : 1.5;
                  return formPrice * quantityMultiplier * materialMultiplier;
                };
              return (
                <Grid container spacing={2}>
                  <Typography variant="h6">{formName}</Typography>
                  <Typography variant="h6">Үнэ: {calculatePrice().toFixed(2)}₮</Typography>
                </Grid>
              );
            }) () }
            <Grid>
              <Grid container spacing={1}>
                <Button
                  variant="outlined"
                  endIcon={<ClearIcon />}
                  onClick={() => setOpen(true)}
                >
                  Устгах
                </Button>
                <Button
                  variant="outlined"
                  endIcon={<SaveIcon />}
                  onClick={async () => {
                    if (user.role == 1) {
                      if (
                        formName === '' ||
                        formPrice === '' ||
                        canvasRef.current.getObjects().length === 0
                      ) {
                        alert('Please fill all the fields');
                      } else {
                        var dataURL = canvasRef.current.toDataURL({
                          format: 'jpeg',
                          quality: 0.75
                        });

                        const data = await fetch(`/api/templates/create`, {
                          method: id ? 'PUT' : 'POST',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                            template_id: id ? +id : null,
                            template_name: formName,
                            price: +formPrice,
                            image_url: dataURL,
                            design_object: JSON.stringify(
                              canvasRef.current.toJSON()
                            )
                          })
                        });
                        const json = await data.json();
                        if (json.data.status === 200) {
                          toast.success(json.data.message);
                        } else {
                          toast.error(json.data.message);
                        }
                        console.log("json", json);
                      }
                    }

                    if (user.role == 2) {
                      var dataURL = canvasRef.current.toDataURL({
                        format: 'jpeg',
                        quality: 0.75
                      });

                       if (
                         side === '' ||
                         quantity === '' || 
                         paper_type === '' ||
                         canvasRef.current.getObjects().length === 0
                       ) {
                         alert('Please fill all the fields');
                       } else {

                         const data = await fetch(`/api/templates/${id}`, {
                           method: 'POST',
                           headers: {
                             'Content-Type': 'application/json'
                           },
                           body: JSON.stringify({
                              user_id: user.user_id,
                              template_id: +id,
                              material_type: 2,
                              paper_type: formPaperType,
                              quantity: +formQuantity,
                              side: formSide,
                              description: "",
                              file_name: formName,
                              file_url: dataURL,
                              total_price: +formPrice,
                              // design_object: JSON.stringify(
                              //   canvasRef.current.toJSON()
                              // )
                           })
                         });
                         const json = await data.json();
                          if (json.status === 200) {
                            toast.success(json.message);
                          } else {
                            toast.error(json.message);
                          }
                          console.log("json", json);
                       }
                    }
                  }}
                >
                  {user && user.role == 1 ? 'Хадгалах' : 'Захиалах'}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <CardContent sx={{ pt: 0 }}>
            <div
              style={{
                backgroundColor: 'darkgrey',
                padding: 50
              }}
            >
              <canvas id="canvas" />
            </div>
          </CardContent>
          <React.Fragment>
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                  event.preventDefault();
                  canvasRef.current.remove(...canvasRef.current.getObjects());
                  setOpen(false);
                }
              }}
            >
              <DialogTitle>Анхааруулга</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Та устгахдаа итгэлтэй байна уу?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Цуцлах</Button>
                <Button type="submit">Тийм</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Editor;
