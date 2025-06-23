import brandingImage from '../../assets/branding_2.png'

export default function BrandingSection() {
    return (
        <section className='flex justify-between w-full h-[400px] text-black gap-6'>
            <div className='flex flex-col h-full justify-center flex-1 gap-8'>
                <h1 className="text-6xl font-bold">Análisis de Radiografías Dentales</h1>
                <p className="text-2xl text-black/60">Apoyo inteligente para detectar anomalías en caninos mediante el análisis automático con Inteligencia Artificial de radiografías dentales.</p>
            </div>
            <div className='flex w-[70%] flex-col justify-end items-end h-full'>
                <img
                    src={brandingImage}
                    alt="Branding Image"
                    className='w-[80%] h-full object-cover rounded-lg shadow-lg'
                />
            </div>
        </section>
    )
}
