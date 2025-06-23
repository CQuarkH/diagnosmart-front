import { useState } from "react";

export interface RequestAnalyzeProps {
    image: File;
    patientAge?: number;
    patientGender?: string;
    doctorObservations?: string;
}

export const useAnalyze = (analyzeFunction: (data: RequestAnalyzeProps, token: string) => Promise<any>) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<any>(null);

    const requestAnalyze = async (props: RequestAnalyzeProps, token: string) => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const analysisResult = await analyzeFunction(props, token);
            setResult(analysisResult);
            setError(null);
        } catch (err: Error | any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        result,
        requestAnalyze
    };
}