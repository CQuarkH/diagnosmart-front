import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useAnalyze } from "../../hooks/useAnalyze";
import { AnalyzeService } from "../../services/analyze_service";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import SelectInput from "../atoms/SelectInput";
import ImagePicker from "../molecules/ImagePicker";
import ImageInspect from "../molecules/ImageInspect";

export default function AnalysisSection() {
    const analyzeService = new AnalyzeService();
    const { loading, requestAnalyze, error, result, restartResult } = useAnalyze(analyzeService.analyzeImage);
    const { user } = useAuthContext();

    const [patientAge, setPatientAge] = useState<string>("");
    const [patientGender, setPatientGender] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [doctorObservations, setDoctorObservations] = useState<string>("");
    const [showInspect, setShowInspect] = useState<boolean>(false);

    const isFormValid = Boolean(patientAge && patientGender && imageFile);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isFormValid) {

            await requestAnalyze({
                image: imageFile!,
                patientAge: patientAge ? parseInt(patientAge) : undefined,
                patientGender,
                doctorObservations
            }, user!.token!);
        }
    }

    const handleRestart = () => {
        setPatientAge("");
        setPatientGender("");
        setImageFile(null);
        setDoctorObservations("");
        restartResult();
    }

    return (
        <form onSubmit={handleSubmit} className="relative flex flex-col gap-20 w-full">
            {
                loading && (
                    <div className="absolute flex justify-center items-center w-full h-[80%] z-10 bg-white/80">
                        <span className="text-lg font-semibold text-black/80 animate-pulse">Analizando RX...</span>
                    </div>
                )
            }

            {
                result && !loading && (
                    <>
                        <div className="flex flex-col gap-6">
                            <h2 className="text-3xl font-bold">Resultados del Análisis</h2>
                            <p className="text-lg text-black/60">El análisis de la radiografía ha sido completado. A continuación se presentan los resultados:</p>
                        </div>
                        <div className="flex w-full gap-x-20">

                            {/* imagen de la radiografía a analizar */}
                            <div className="flex flex-3 flex-col gap-6">
                                {
                                    showInspect ? (
                                        <ImageInspect
                                            image={result.image}
                                            summary={result.summary}
                                            onClose={() => setShowInspect(false)}
                                        />
                                    ) : (
                                        <img
                                            onClick={() => setShowInspect(true)}
                                            src={result.image} alt="Radiografía analizada" className="w-full h-auto rounded-lg shadow-md" />
                                    )
                                }
                            </div>

                            {/* info del paciente */}
                            <div className="flex flex-col gap-6">
                                <h3 className="text-lg font-bold">Detalles de Caninos (lados invertidos):</h3>
                                {result.summary.map((a, i) => (
                                    <li key={i} className="text-lg">
                                        <strong>{a.side === "izq" ? "Derecho" : "Izquierdo"}:</strong>{" "}
                                        {a.angle.toFixed(1) === '0.0' ? 'No detectado' : `${a.angle.toFixed(1)}°`}
                                        {(a.angle > 15) && <span className="text-red-500 font-semibold">(¡Riesgo!)</span>}
                                    </li>
                                ))}

                                {
                                    result.summary.every(a => !(a.angle > 15)) && (
                                        <p className="text-lg text-black/60">
                                            No se detectaron anomalías en la radiografía.
                                        </p>
                                    )
                                }
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-center">
                            <button
                                onClick={handleRestart}
                                type="button"
                                className="w-1/3 h-14 text-lg font-semibold cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                Realizar otro análisis
                            </button> </div>
                    </>
                )
            }
            {
                !result && (<>
                    <div className="flex flex-col gap-6">
                        <h2 className="text-3xl font-bold">Análisis</h2>
                        <p className="text-lg text-black/60">Ingresa los datos del paciente y sube una radiografía dental para que el sistema pueda analizarla y detectar posibles anomalías.</p>
                    </div>
                    <div className="flex w-full gap-x-20">

                        {/* info del paciente */}
                        <div className="flex flex-col gap-6">
                            <h3 className="text-lg font-medium">Información del Paciente</h3>
                            <div className="flex gap-8">
                                <Input
                                    value={patientAge}
                                    onChange={(e) => setPatientAge(e.target.value)}
                                    name="patient_age"
                                    title="Edad" placeholder="Ej. 20" type="number" />
                                <SelectInput
                                    value={patientGender}
                                    onChange={(e) => setPatientGender(e.target.value)}
                                    name="patient_gender"
                                    options={[
                                        { label: 'Masculino', value: 'M' },
                                        { label: 'Femenino', value: 'F' },]}
                                    title="Sexo" placeholder="Ej. Femenino" />
                            </div>
                            <Input
                                value={doctorObservations}
                                onChange={(e) => setDoctorObservations(e.target.value)}
                                type="textarea" name="doctor_observations" title="Observaciones" placeholder="Ej. Este paciente presenta alteraciones no comunes en la forma de sus caninos." />
                        </div>

                        {/* imagen de la radiografía a analizar */}
                        <div className="flex flex-2 flex-col gap-6">
                            <ImagePicker onImageSelected={(image) => setImageFile(image)} />

                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-6">
                        {error && !loading && <p className="text-red-500 text-sm font-semibold">{error}</p>}
                        <Button
                            active={isFormValid}
                            isLoading={loading}
                            type="submit" classname="w-1/3 h-14 text-lg font-semibold">
                            Analizar Radiografía
                        </Button>
                        <p className="text-sm text-black/60">El modelo puede cometer errores. Los resultados generados deben ser validados por un especialista.</p>
                    </div></>)
            }
        </form>
    )
}
