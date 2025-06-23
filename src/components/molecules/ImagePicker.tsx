import { useState, useCallback, type ChangeEvent, type DragEvent, type JSX } from 'react';
import rxlogo from '../../assets/dental.png';

interface ImagePickerProps {
    onImageSelected?: (image: File) => void;
}

export default function ImagePicker({ onImageSelected }: ImagePickerProps): JSX.Element {
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);
    const [dragOver, setDragOver] = useState<boolean>(false);

    // -----------------------------
    // Handler cuando el usuario selecciona un archivo desde el diálogo
    // -----------------------------
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0] ?? null;
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewSrc(reader.result as string);
                onImageSelected && onImageSelected(file);

            };
            reader.readAsDataURL(file);
        }
    };

    const handleUnselectImage = (): void => {
        setPreviewSrc(null);
        onImageSelected && onImageSelected(null as unknown as File);
    }

    // -----------------------------
    // Handlers para drag & drop
    // -----------------------------
    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
    }, []);

    const handleDrop = useCallback((e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);

        const file = e.dataTransfer.files?.[0] ?? null;
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewSrc(reader.result as string);
                onImageSelected && onImageSelected(file);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    return (
        <div className='h-80'>

            {/* Zona de arrastrar y soltar */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex flex-col gap-2 relative border border-dashed border-gray-400 rounded-lg p-10 text-center items-center justify-center h-full cursor-pointer transition-colors duration-200 ease-in-out ${dragOver ? 'bg-primary/20' : 'bg-white'}`}
            >
                {previewSrc ? (
                    <>
                        <button
                            onClick={handleUnselectImage}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full py-1 px-2.5 hover:bg-red-600 transition-colors cursor-pointer"
                        >
                            X
                        </button>
                        <img src={previewSrc}
                            className='w-full h-full object-contain'></img>
                    </>

                ) : (
                    <>
                        <img src={rxlogo}
                            className='w-32 h-20 object-contain'></img>
                        {dragOver
                            ? 'Suelta la radiografía aquí'
                            : 'Arrastra y suelta una radiografía, o haz clic para seleccionar'}
                        {/* Input invisible para seleccionar archivos */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                opacity: 0,
                                cursor: 'pointer',
                            }}
                        />
                    </>

                )}

            </div>
        </div>
    );
}
