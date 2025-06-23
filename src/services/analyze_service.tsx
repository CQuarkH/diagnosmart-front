import type { RequestAnalyzeProps } from "../hooks/useAnalyze";

const API_URL = import.meta.env.VITE_API_URL + '/analyze';

export class AnalyzeService {

    async analyzeImage(req: RequestAnalyzeProps, token: string): Promise<any> {
        const formData = new FormData();

        formData.append('file', req.image);
        formData.append('patient_age', req.patientAge?.toString() || '');
        formData.append('patient_gender', req.patientGender || '');
        formData.append('doctor_observations', req.doctorObservations || '');

        console.log("Sending request to analyze image with data:", {
            file: req.image,
            patient_age: req.patientAge,
            patient_gender: req.patientGender,
            doctor_observations: req.doctorObservations,
        });

        // await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate delay for debugging

        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error('Error al analizar la imagen: ' + result.detail);
        }

        return result;
    }

}