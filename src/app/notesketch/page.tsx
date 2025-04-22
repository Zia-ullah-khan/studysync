"use client";
import { useRef, useState, useEffect } from 'react';
import { FaPen, FaEraser, FaSave, FaTrash } from 'react-icons/fa';

export default function NoteSketch() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
    const [color, setColor] = useState('#000000');
    const [lineWidth, setLineWidth] = useState(2);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth * 2;
            canvas.height = canvas.offsetHeight * 2;
            canvas.style.width = `${canvas.offsetWidth}px`;
            canvas.style.height = `${canvas.offsetHeight}px`;
            
            const context = canvas.getContext('2d');
            if (context) {
                context.scale(2, 2);
                context.lineCap = 'round';
                context.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
                context.lineWidth = lineWidth;
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const context = canvas.getContext('2d');
        if (context) {
            context.scale(2, 2);
            context.lineCap = 'round';
            context.strokeStyle = color;
            context.lineWidth = lineWidth;
            contextRef.current = context;
        }
        
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
            contextRef.current.lineWidth = lineWidth;
        }
    }, [tool, color, lineWidth]);

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        const { offsetX, offsetY } = getCoordinates(e);
        contextRef.current?.beginPath();
        contextRef.current?.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = getCoordinates(e);
        contextRef.current?.lineTo(offsetX, offsetY);
        contextRef.current?.stroke();
    };

    const stopDrawing = () => {
        contextRef.current?.closePath();
        setIsDrawing(false);
    };

    const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current!;
        const rect = canvas.getBoundingClientRect();
        
        if ('touches' in e) {
            e.preventDefault();
            return {
                offsetX: e.touches[0].clientX - rect.left,
                offsetY: e.touches[0].clientY - rect.top
            };
        } else {
            return {
                offsetX: e.nativeEvent.offsetX,
                offsetY: e.nativeEvent.offsetY
            };
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (context && canvas) {
            context.clearRect(0, 0, canvas.width / 2, canvas.height / 2);
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

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <div className="p-2 sm:p-4 bg-white shadow-sm">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Note Sketch</h1>
            </div>
            
            <div className="flex-1 relative overflow-hidden touch-none">
                <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full bg-white border border-gray-300"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={(e) => {
                        e.preventDefault();
                        startDrawing(e);
                    }}
                    onTouchMove={(e) => {
                        e.preventDefault();
                        draw(e);
                    }}
                    onTouchEnd={(e) => {
                        e.preventDefault();
                        stopDrawing();
                    }}
                    onTouchCancel={(e) => {
                        e.preventDefault();
                        stopDrawing();
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
                    </div>
                </div>
            </div>
        </div>
    );
}