"use client";
import { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { FaPen, FaEraser, FaSave, FaTrash, FaHome } from 'react-icons/fa';

export default function NoteSketch() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
    const [color, setColor] = useState('#000000');
    const [lineWidth, setLineWidth] = useState(2);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(null);
    const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const [bgColor, setBgColor] = useState('#FFFFFF');
    const [drawingData, setDrawingData] = useState<ImageData | null>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const container = canvas.parentElement;
        if (!container) return;

        const { clientWidth, clientHeight } = container;
        canvas.style.width = `${clientWidth}px`;
        canvas.style.height = `${clientHeight}px`;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = clientWidth * dpr;
        canvas.height = clientHeight * dpr;
        const context = canvas.getContext('2d');
        if (context) {
            context.scale(dpr, dpr);
            context.lineCap = 'round';
            context.strokeStyle = tool === 'eraser' ? bgColor : color;
            context.lineWidth = lineWidth;
            contextRef.current = context;

            context.fillStyle = bgColor;
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
    }, [tool, bgColor, color, lineWidth]);

    useLayoutEffect(() => {
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, [resizeCanvas]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (context && canvas) {
            if (!drawingData) {
                setDrawingData(context.getImageData(0, 0, canvas.width, canvas.height));
                return;
            }
            context.fillStyle = bgColor;
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.putImageData(drawingData, 0, 0);

            if (tool === 'eraser') {
                context.strokeStyle = bgColor;
            }
        }
    }, [bgColor, drawingData, tool]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (context) {
            context.strokeStyle = tool === 'eraser' ? bgColor : color;
            context.lineWidth = lineWidth;
        }
    }, [color, lineWidth, tool, bgColor]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.style.transform = `translate(${canvasOffset.x}px, ${canvasOffset.y}px) scale(${scale})`;
        }
    }, [canvasOffset, scale]);

    const captureDrawing = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (context && canvas) {
            setDrawingData(context.getImageData(0, 0, canvas.width, canvas.height));
        }
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        const { offsetX, offsetY } = getCoordinates(e);
        contextRef.current?.beginPath();
        contextRef.current?.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = getCoordinates(e);
        console.log(offsetX, offsetY);
        contextRef.current?.lineTo(offsetX, offsetY);
        contextRef.current?.stroke();
    };

    const stopDrawing = () => {
        contextRef.current?.closePath();
        setIsDrawing(false);
        captureDrawing();
    };

    const startPanning = (e: React.MouseEvent | React.TouchEvent) => {
        if ('touches' in e && e.touches.length === 2) {
            e.preventDefault();
            setIsPanning(true);
            setPanStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        } else if ('button' in e && (e.button === 2 || e.button === 1)) {
            e.preventDefault();
            setIsPanning(true);
            setPanStart({ x: e.clientX, y: e.clientY });
        }
    };

    const panCanvas = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isPanning || !panStart) return;

        let currentX, currentY;
        if ('touches' in e && e.touches.length === 2) {
            e.preventDefault();
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        } else if ('clientX' in e) {
            currentX = e.clientX;
            currentY = e.clientY;
        } else {
            return;
        }

        const deltaX = currentX - panStart.x;
        const deltaY = currentY - panStart.y;

        setCanvasOffset((prev) => ({
            x: prev.x + deltaX,
            y: prev.y + deltaY,
        }));

        setPanStart({ x: currentX, y: currentY });
    };

    const stopPanning = () => {
        setIsPanning(false);
        setPanStart(null);
    };

    const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current!;
        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        if ('touches' in e) {
            return {
                offsetX: (e.touches[0].clientX - rect.left) * scaleX / (window.devicePixelRatio || 1),
                offsetY: (e.touches[0].clientY - rect.top) * scaleY / (window.devicePixelRatio || 1),
            };
        } else {
            return {
                offsetX: (e.nativeEvent.clientX - rect.left) * scaleX / (window.devicePixelRatio || 1),
                offsetY: (e.nativeEvent.clientY - rect.top) * scaleY / (window.devicePixelRatio || 1),
            };
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (context && canvas) {
            context.fillStyle = bgColor;
            context.fillRect(0, 0, canvas.width, canvas.height);
            setDrawingData(context.getImageData(0, 0, canvas.width, canvas.height));
        }
    };

    const saveCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = `note-${new Date().toISOString().slice(0, 10)}.png`;
            link.click();
        }
    };

    const handleWheelZoom = (e: React.WheelEvent) => {
        if (e.ctrlKey || e.button === 1) {
            e.preventDefault();
            const zoomFactor = 0.1;
            const newScale = Math.min(Math.max(scale - e.deltaY * zoomFactor * 0.01, 0.5), 10);
            setScale(newScale);
        }
    };

    const resetToHomeSquare = useCallback(() => {
        setCanvasOffset({ x: 0, y: 0 });
        setScale(1);
    }, []);

    useEffect(() => {
        if (contextRef.current && canvasRef.current) {
            captureDrawing();
        }
    }, []);

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <div className="p-2 sm:p-4 bg-white shadow-sm">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Note Sketch</h1>
            </div>

            <div
                className="flex-1 relative overflow-hidden touch-none"
                onWheel={handleWheelZoom}
            >
                <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full bg-white border border-gray-300"
                    onMouseDown={(e) => {
                        if (e.button === 2 || e.button === 1) {
                            startPanning(e);
                        } else {
                            startDrawing(e);
                        }
                    }}
                    onMouseMove={(e) => {
                        if (isPanning) panCanvas(e);
                        else draw(e);
                    }}
                    onMouseUp={() => {
                        if (isPanning) stopPanning();
                        else stopDrawing();
                    }}
                    onContextMenu={(e) => e.preventDefault()}
                    onTouchStart={(e) => {
                        if (e.touches.length === 2) startPanning(e);
                        else startDrawing(e);
                    }}
                    onTouchMove={(e) => {
                        if (isPanning) panCanvas(e);
                        else draw(e);
                    }}
                    onTouchEnd={() => {
                        if (isPanning) stopPanning();
                        else stopDrawing();
                    }}
                    onTouchCancel={() => {
                        if (isPanning) stopPanning();
                        else stopDrawing();
                    }}
                />
            </div>

            <div className="p-2 sm:p-4 bg-white shadow-lg border-t border-gray-300">
                <div className={`${isMobile ? 'flex flex-col space-y-3' : 'flex items-center justify-between'}`}>
                    <div className={`flex items-center ${isMobile ? 'justify-between' : 'space-x-4'}`}>
                        <button
                            onClick={() => setTool('pen')}
                            className={`p-3 rounded ${tool === 'pen' ? 'bg-blue-100' : 'bg-gray-100'}`}
                        >
                            <FaPen className={`${tool === 'pen' ? 'text-blue-600' : 'text-gray-600'}`} />
                        </button>
                        <button
                            onClick={() => setTool('eraser')}
                            className={`p-3 rounded ${tool === 'eraser' ? 'bg-blue-100' : 'bg-gray-100'}`}
                        >
                            <FaEraser className={`${tool === 'eraser' ? 'text-blue-600' : 'text-gray-600'}`} />
                        </button>
                        <div className="flex items-center">
                            <span className="text-gray-700 mr-1 hidden sm:inline">Color:</span>
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                            />
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-700 mr-1 hidden sm:inline">Background:</span>
                            <input
                                type="color"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                                className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                                title="Canvas background color"
                            />
                        </div>
                        <select
                            value={lineWidth}
                            onChange={(e) => setLineWidth(Number(e.target.value))}
                            className="p-2 border border-gray-300 rounded"
                            aria-label="Line thickness"
                        >
                            <option value={1}>Thin</option>
                            <option value={2}>Medium</option>
                            <option value={4}>Thick</option>
                            <option value={6}>Very Thick</option>
                        </select>
                    </div>
                    <div className={`flex items-center ${isMobile ? 'justify-between space-x-2' : 'space-x-4'}`}>
                        <button
                            onClick={clearCanvas}
                            className="p-3 bg-red-100 rounded flex-1 flex justify-center"
                        >
                            <FaTrash className="text-red-600" />
                            <span className="ml-2 hidden sm:inline">Clear</span>
                        </button>
                        <button
                            onClick={saveCanvas}
                            className="p-3 bg-green-100 rounded flex-1 flex justify-center"
                        >
                            <FaSave className="text-green-600" />
                            <span className="ml-2 hidden sm:inline">Save</span>
                        </button>
                        <button
                            onClick={resetToHomeSquare}
                            className="p-3 bg-blue-100 rounded flex-1 flex justify-center"
                        >
                            <FaHome className="text-blue-600" />
                            <span className="ml-2 hidden sm:inline">Home</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}