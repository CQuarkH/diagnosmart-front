import { useState } from "react";

export interface RequestAnalyzeProps {
    image: File;
    patientAge?: number;
    patientGender?: string;
    doctorObservations?: string;
}

export interface CanineSummary {
    side: string;
    angle: number;
    confidence: number;
    atRisk: boolean;
}

export interface AnalysisResult {
    image: string
    summary: CanineSummary[]
}

export const useAnalyze = (analyzeFunction: (data: RequestAnalyzeProps, token: string) => Promise<any>) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<AnalysisResult>();

    const restartResult = () => {
        setResult(undefined);
        setError(null);
        setLoading(false);
    };

    const requestAnalyze = async (props: RequestAnalyzeProps, token: string) => {
        setLoading(true);
        setError(null);
        setResult(undefined);

        try {
            const analysisResult = await analyzeFunction(props, token);
            console.log("Analysis result:", analysisResult);
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
        requestAnalyze,
        restartResult
    };
}