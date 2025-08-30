interface AngleData {
    side: string;
    angle: number;
    confidence: number;
    atRisk: boolean;
}

interface ImageInspectProps {
    image: string;
    summary: AngleData[];
    onClose: () => void;
}

export default function ImageInspect({
    image,
    summary,
    onClose,
}: ImageInspectProps) {
    return (
        <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-2xl shadow-xl p-6 max-w-[90vw] max-h-[90vh] overflow-auto"
                onClick={e => e.stopPropagation()}
            >
                {/* Botón de cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-black text-xl font-bold hover:text-gray-900"
                    aria-label="Cerrar"
                >
                    ✕
                </button>

                {/* Imagen grande */}
                <img
                    src={image}
                    alt="Radiografía ampliada"
                    className="block max-w-full max-h-[70vh] mx-auto rounded-lg mb-6"
                />

                {/* Detalles debajo */}
                <div className="flex flex-col gap-4 ">
                    <h3 className="text-xl font-semibold mb-2">Detalles de Caninos (lados invertidos)</h3>

                    <ul className="list-disc list-inside space-y-1">
                        {summary.map((a, i) => (
                            <li key={i} className="text-lg">
                                <strong>{a.side === 'izq' ? 'Derecho' : 'Izquierdo'}:</strong>{' '}
                                {a.angle.toFixed(1) === '0.0' ? 'No detectado' : `${a.angle.toFixed(1)}°`}{' '}
                                {(a.angle > 15) && <span className="text-red-500 font-semibold">(¡Riesgo!)</span>}
                            </li>
                        ))}
                    </ul>
                    {summary.every(a => !(a.angle > 15)) ?
                        <p className="text-lg text-gray-600">
                            No se detectaron anomalías en la radiografía.
                        </p> : <p className="text-lg text-red-600 font-semibold">
                            Se detectaron anomalías en la radiografía. Revise detalladamente los ángulos de los caninos y la proyección de los mismos.
                        </p>
                    }

                </div>
            </div>
        </div>
    );
}
