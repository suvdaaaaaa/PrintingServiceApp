"use client";
import React, {
    useRef,
    useState,
    useEffect,
    ReactNode,
    ChangeEvent,
} from "react";

// Custom Icons component
const Icons = {
    Bold: () => <span className="font-bold">B</span>,
    Italic: () => <span className="italic">I</span>,
    Underline: () => <span className="underline">U</span>,
    AlignLeft: () => <span className="text-sm">⟵</span>,
    AlignCenter: () => <span className="text-sm">↔</span>,
    AlignRight: () => <span className="text-sm">⟶</span>,
    Upload: () => (
        <svg
            className="w-8 h-8 mb-2 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
    ),
};

// Card Component
const Card = ({ className = "", children }) => (
    <div
        className={`rounded-lg border bg-white text-gray-900 shadow-sm ${className}`}
    >
        {children}
    </div>
);

const CardHeader = ({ className = "", children }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
        {children}
    </div>
);

const CardTitle = ({ className = "", children }) => (
    <h3
        className={`text-lg font-semibold leading-none tracking-tight ${className}`}
    >
        {children}
    </h3>
);

const CardContent = ({ className = "", children }) => (
    <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

// Button Component
const Button = ({
    className = "",
    variant = "default",
    size = "default",
    children,
    onClick,
    ...props
}) => {
    const baseStyles =
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
        default: "bg-gray-900 text-white hover:bg-gray-800",
        outline: "border border-gray-200 hover:bg-gray-100",
    };

    const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

// Input Component
const Input = ({ className = "", ...props }) => (
    <input
        className={`flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
    />
);

// Select Components

const Select = ({ className = "", children, value, onChange, ...props }) => (
    <select
        className={`flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        value={value}
        onChange={onChange}
        {...props}
    >
        {children}
    </select>
);

// Slider Component
const Slider = ({
    className = "",
    value,
    min = 0,
    max = 100,
    step = 1, 
    onChange,
    ...props
}) => (
    <input
        type="range"
        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer 
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-4 
            [&::-webkit-slider-thumb]:h-4 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-gray-900 
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:w-4 
            [&::-moz-range-thumb]:h-4 
            [&::-moz-range-thumb]:rounded-full 
            [&::-moz-range-thumb]:bg-gray-900 
            [&::-moz-range-thumb]:cursor-pointer 
            ${className}`}
        value={value}
        min={min} 
        max={max}
        step={step}
        onChange={onChange}
        {...props}
    />
);

// Main Business Card Editor Component
const BusinessCardEditor = ({id}) => {
    const canvasRef = useRef(null);
    const [context, setContext] = useState(null);

    const [text, setText] = useState("");
    const [fontSize, setFontSize] = useState(24);
    const [fontColor, setFontColor] = useState("#4A5568");
    const [fontFamily, setFontFamily] = useState("Arial");
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);
    const [alignment, setAlignment] = useState("center");
    const [textPosition, setTextPosition] = useState({ x: 450, y: 250 });
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);

    async function getTemplateImage () {
        const data = await fetch(`/api/templates/${id}`);
        const res = await data.json();

        fetch(res.image_url)
        .then(response => response.blob())
        .then(blob => {
            const img = new Image();
            img.src = URL.createObjectURL(blob);
            img.onload = () => {
                setUploadedImage(img);
                URL.revokeObjectURL(img.src);
            };
        });
        
       
    }
    useEffect(() => {
        getTemplateImage()
    },[])

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = 900;
            canvas.height = 500;
            const ctx = canvas.getContext("2d");
            setContext(ctx);
        }
    }, []);

    useEffect(() => {
        drawCanvas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        text,
        fontSize,
        fontColor,
        fontFamily,
        bold,
        italic,
        underline,
        alignment,
        uploadedImage,
        textPosition,
    ]);

    const drawCanvas = () => {
        if (context) {
            context.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            );

            if (!uploadedImage) {
                const gradient = context.createLinearGradient(
                    0,
                    0,
                    canvasRef.current.width,
                    canvasRef.current.height
                );
                gradient.addColorStop(0, "#f3e7ff");
                gradient.addColorStop(1, "#e5e7ff");
                context.fillStyle = gradient;
                context.fillRect(
                    0,
                    0,
                    canvasRef.current.width,
                    canvasRef.current.height
                );
            } else {
                context.drawImage(
                    uploadedImage,
                    0,
                    0,
                    canvasRef.current.width,
                    canvasRef.current.height
                );
            }

            context.font = `${italic ? "italic" : ""} ${
                bold ? "bold" : ""
            } ${fontSize}px ${fontFamily}`;
            context.fillStyle = fontColor;
            context.textAlign = alignment;

            context.fillText(text, textPosition.x, textPosition.y);

            if (underline) {
                context.beginPath();
                context.moveTo(
                    textPosition.x - context.measureText(text).width / 2,
                    textPosition.y + 5
                );
                context.lineTo(
                    textPosition.x + context.measureText(text).width / 2,
                    textPosition.y + 5
                );
                context.strokeStyle = fontColor;
                context.lineWidth = 1;
                context.stroke();
            }
        }
    };

    const handleDrag = (e) => {
        if (isDragging) {
            const rect = canvasRef.current.getBoundingClientRect();
            setTextPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const img = new Image();
            img.src = URL.createObjectURL(e.target.files[0]);
            img.onload = () => {
                setUploadedImage(img);
                URL.revokeObjectURL(img.src);
            };
        }
    };

    return (
        <div className="flex gap-6 p-6">
            <Card className="w-80">
                <CardHeader>
                    <CardTitle> </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Текст</label>
                        <Input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Текст оруулах"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Фонт</label>
                        <Select
                            value={fontFamily}
                            onChange={(e) => setFontFamily(e.target.value)}
                        >
                            <option value="Arial">Arial</option>
                            <option value="Times New Roman">
                                Times New Roman
                            </option>
                            <option value="Courier New">Courier New</option>
                            <option value="Georgia">Georgia</option>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Фонтын хэмжээ: {fontSize}px
                        </label>
                        <Slider
                            value={fontSize}
                            onChange={(e) =>
                                setFontSize(parseInt(e.target.value))
                            }
                            min={12}
                            max={72}
                            step={1}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Фонтын өнгө
                        </label>
                        <Input
                            type="color"
                            value={fontColor}
                            onChange={(e) => setFontColor(e.target.value)}
                            className="h-10"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Текстийн загвар
                        </label>
                        <div className="flex gap-2">
                            <Button
                                variant={bold ? "default" : "outline"}
                                size="icon"
                                onClick={() => setBold(!bold)}
                            >
                                <Icons.Bold />
                            </Button>
                            <Button
                                variant={italic ? "default" : "outline"}
                                size="icon"
                                onClick={() => setItalic(!italic)}
                            >
                                <Icons.Italic />
                            </Button>
                            <Button
                                variant={underline ? "default" : "outline"}
                                size="icon"
                                onClick={() => setUnderline(!underline)}
                            >
                                <Icons.Underline />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Байрлуулалт
                        </label>
                        <div className="flex gap-2">
                            <Button
                                variant={
                                    alignment === "left" ? "default" : "outline"
                                }
                                size="icon"
                                onClick={() => setAlignment("left")}
                            >
                                <Icons.AlignLeft />
                            </Button>
                            <Button
                                variant={
                                    alignment === "center"
                                        ? "default"
                                        : "outline"
                                }
                                size="icon"
                                onClick={() => setAlignment("center")}
                            >
                                <Icons.AlignCenter />
                            </Button>
                            <Button
                                variant={
                                    alignment === "right"
                                        ? "default"
                                        : "outline"
                                }
                                size="icon"
                                onClick={() => setAlignment("right")}
                            >
                                <Icons.AlignRight />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Зураг</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Icons.Upload />
                                    <p className="text-sm text-gray-500">
                                        Зураг оруулах
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </label>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="flex-1 relative">
                <CardHeader>
                    <CardTitle>Таны нэрийн хуудас</CardTitle>
                </CardHeader>
                <CardContent>
                    <canvas
                        ref={canvasRef}
                        onMouseDown={() => setIsDragging(true)}
                        onMouseMove={handleDrag}
                        onMouseUp={() => setIsDragging(false)}
                        onMouseLeave={() => setIsDragging(false)}
                        className="w-full border rounded-lg shadow-sm cursor-move"
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default BusinessCardEditor;
