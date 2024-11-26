"use client";
import * as fabric from "fabric";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { MuiColorInput } from "mui-color-input";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
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

    var deleteImg = document.createElement("img");
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
        height: 100,
        width: 50,
        fill: "#e00606",
    });
    rect.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: 16,
        cursorStyle: "pointer",
        mouseUpHandler: deleteObject,
        render: renderIcon,
        cornerSize: 24,
    });
    canvi.add(rect);
    canvi.renderAll();
};

const addCircle = (canvi) => {
    const circle = new fabric.Circle({
        radius: 100,
        angle: 30,
        fill: "#e00606",
    });
    circle.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: 16,
        cursorStyle: "pointer",
        mouseUpHandler: deleteObject,
        render: renderIcon,
        cornerSize: 24,
    });
    canvi.add(circle);
    canvi.renderAll();
};

const addTriangle = (canvi) => {
    const triangle = new fabric.Triangle({
        width: 150,
        height: 100,
        angle: 45,
        fill: "#e00606",
    });
    triangle.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: 16,
        cursorStyle: "pointer",
        mouseUpHandler: deleteObject,
        render: renderIcon,
        cornerSize: 24,
    });
    canvi.add(triangle);
    canvi.renderAll();
};

const addImage = (canvi, dataUrl) => {
    fabric.FabricImage.fromURL(dataUrl, {
        crossOrigin: "anonymous",
    }).then((image) => {
        image.scaleToWidth(200);
        image.controls.deleteControl = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: 16,
            cursorStyle: "pointer",
            mouseUpHandler: deleteObject,
            render: renderIcon,
            cornerSize: 24,
        });
        canvi.add(image);
        canvi.setActiveObject(image);
    });
};

const addText = (canvi) => {
    const pacifico = new fabric.Textbox("Correctly loaded Pacifico", {
        left: 50,
        top: 10,
        width: 200,
        fontSize: 60,
        fontFamily: "Pacifico",
        fill: "#000000",
    });

    pacifico.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: 16,
        cursorStyle: "pointer",
        mouseUpHandler: deleteObject,
        render: renderIcon,
        cornerSize: 24,
    });
    canvi.add(pacifico);
    canvi.renderAll();
};

function Dashboard() {
    const [formName, setFormName] = React.useState("Hello");
    const [formPrice, setFormPrice] = React.useState(10000);
    const [open, setOpen] = React.useState(false);
    const [canvas, setCanvas] = useState("");
    const [fontToolbar, setFontToolbar] = React.useState(false);
    const [colorToolbar, setColorToolbar] = React.useState(false);
    const [color, setColor] = React.useState("#ffffff");
    const [formats, setFormats] = React.useState(() => []);
    const [alignment, setAlignment] = React.useState("left");

    const [bgColor, setBgColor] = React.useState("#ffffff");

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
        if (newFormats.includes("bold")) {
            canvas.getActiveObject().set("fontWeight", "bold");
        } else {
            canvas.getActiveObject().set("fontWeight", "normal");
        }

        if (newFormats.includes("italic")) {
            canvas.getActiveObject().set("fontStyle", "italic");
        } else {
            canvas.getActiveObject().set("fontStyle", "");
        }

        if (newFormats.includes("underlined")) {
            canvas.getActiveObject().set("underline", true);
        } else {
            canvas.getActiveObject().set("underline", false);
        }

        canvas.renderAll();
    };

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
        canvas.getActiveObject().set("textAlign", newAlignment);
        canvas.renderAll();
    };

    const handleChangeColor = (newValue) => {
        setColor(newValue);
        canvas.getActiveObject().set("fill", newValue);
        canvas.renderAll();
    };

    const handleBgChangeColor = (newValue) => {
        setBgColor(newValue);
        canvas.backgroundColor = newValue;
        canvas.renderAll();
    };

    useEffect(() => {
        setCanvas(initCanvas());
    }, []);

    const initCanvas = () => {
        var canvi = new fabric.Canvas("canvas", {
            height: 350,
            width: 600,
            backgroundColor: bgColor,
        });
        // canvi.on("selection:created", onObjectSelected);
        canvi.on("selection:created", (obj) => {
            const { selected } = obj;
            const { type, fill } = selected[0];
            console.log("An object has been selected", type);
            setColorToolbar(true);
            setColor(fill);
            setFontToolbar(type == "textbox" ? true : false);
        });

        canvi.on("selection:updated", (obj) => {
            const { selected } = obj;
            const { type, fill } = selected[0];
            console.log("You have selected the other object", type);
            setColorToolbar(true);
            setColor(fill);
            setFontToolbar(type == "textbox" ? true : false);
        });
        canvi.on("selection:cleared", () => {
            setColorToolbar(false);
            setFontToolbar(false);
        });
        canvi.renderAll();
        return canvi;
    };

    return (
        <Grid container spacing={2}>
            <Grid size={4}>
                <Card>
                    <CardHeader title="Toolbar" />
                    <CardContent sx={{ pt: 0 }}>
                        <ToggleButtonGroup>
                            <ToggleButton onClick={() => addRect(canvas)}>
                                <CropSquareIcon />
                            </ToggleButton>
                            <ToggleButton onClick={() => addCircle(canvas)}>
                                <PanoramaFishEyeIcon />
                            </ToggleButton>
                            <ToggleButton onClick={() => addTriangle(canvas)}>
                                <ChangeHistoryIcon />
                            </ToggleButton>
                            <ToggleButton onClick={() => addText(canvas)}>
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
                                                addImage(
                                                    canvas,
                                                    f.target.result
                                                );
                                            };
                                            reader.readAsDataURL(file);
                                        }}
                                    />
                                </Button>
                            </ToggleButton>
                        </ToggleButtonGroup>

                        <Stack direction="column" mt={2} gap={1}>
                            <Typography variant="h6">
                                Background Color
                            </Typography>
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
                                <Typography variant="h6">Color</Typography>
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
                                    <Typography variant="h6">
                                        Font format
                                    </Typography>
                                    <ToggleButtonGroup
                                        value={formats}
                                        onChange={handleFormat}
                                        aria-label="text formatting"
                                    >
                                        <ToggleButton
                                            value="bold"
                                            aria-label="bold"
                                        >
                                            <FormatBoldIcon />
                                        </ToggleButton>
                                        <ToggleButton
                                            value="italic"
                                            aria-label="italic"
                                        >
                                            <FormatItalicIcon />
                                        </ToggleButton>
                                        <ToggleButton
                                            value="underlined"
                                            aria-label="underlined"
                                        >
                                            <FormatUnderlinedIcon />
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Stack>
                                <Stack direction="column" mt={2} gap={1}>
                                    <Typography variant="h6">
                                        Text Aligment
                                    </Typography>
                                    <ToggleButtonGroup
                                        value={alignment}
                                        exclusive
                                        onChange={handleAlignment}
                                        aria-label="text alignment"
                                    >
                                        <ToggleButton
                                            value="left"
                                            aria-label="left aligned"
                                        >
                                            <FormatAlignLeftIcon />
                                        </ToggleButton>
                                        <ToggleButton
                                            value="center"
                                            aria-label="centered"
                                        >
                                            <FormatAlignCenterIcon />
                                        </ToggleButton>
                                        <ToggleButton
                                            value="right"
                                            aria-label="right aligned"
                                        >
                                            <FormatAlignRightIcon />
                                        </ToggleButton>
                                        <ToggleButton
                                            value="justify"
                                            aria-label="justify"
                                        >
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
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        sx={{ pr: 3.8, pl: 3.8, pt: 2, pb: 2 }}
                    >
                        <Grid container spacing={2}>
                            <TextField
                                variant="outlined"
                                size="small"
                                value={formName}
                                label="Template name"
                                onChange={(e) => setFormName(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                size="small"
                                type="number"
                                value={formPrice}
                                label="Price"
                                onChange={(e) => setFormPrice(e.target.value)}
                            />
                        </Grid>
                        <Grid>
                            <Grid container spacing={1}>
                                <Button
                                    variant="outlined"
                                    endIcon={<ClearIcon />}
                                    onClick={() => setOpen(true)}
                                >
                                    Clear
                                </Button>
                                <Button
                                    variant="outlined"
                                    endIcon={<SaveIcon />}
                                    onClick={async () => {
                                        if (
                                            formName === "" ||
                                            formPrice === "" ||
                                            canvas.getObjects().length === 0
                                        ) {
                                            alert("Please fill all the fields");
                                        } else {
                                            var dataURL = canvas.toDataURL({
                                                format: "jpeg",
                                                quality: 0.75,
                                            });
                                            const data = await fetch(
                                                `/api/templates/create`,
                                                {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type":
                                                            "application/json",
                                                    },
                                                    body: JSON.stringify({
                                                        template_name: formName,
                                                        price: formPrice,
                                                        image_url: dataURL,
                                                        design_object:
                                                            JSON.stringify(
                                                                canvas.toJSON()
                                                            ),
                                                    }),
                                                }
                                            );

                                            const json = await data.json();

                                            console.log(json);
                                        }
                                    }}
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <CardContent sx={{ pt: 0 }}>
                        <div
                            style={{
                                backgroundColor: "darkgrey",
                                padding: 50,
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
                                component: "form",
                                onSubmit: (event) => {
                                    event.preventDefault();
                                    canvas.remove(...canvas.getObjects());
                                    setOpen(false);
                                },
                            }}
                        >
                            <DialogTitle>Warning</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to clear the canvas
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Yes</Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Dashboard;
