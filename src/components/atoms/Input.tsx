
interface InputProps {
    title?: string;
    placeholder?: string;
    type?: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function Input({ title, placeholder, type = 'text', name, value, onChange }: InputProps) {
    return (
        type === 'textarea' ? (
            <div className="flex flex-col gap-4">
                <span>{title}</span>
                <textarea
                    onChange={onChange}
                    value={value}
                    name={name}
                    style={{ resize: 'none' }}
                    rows={4}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-primary" placeholder={placeholder} />
            </div>
        ) : (
            <div className="flex flex-col gap-4">
                <span>{title}</span>
                <input
                    onChange={onChange}
                    value={value}
                    name={name}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-primary"
                    type={type} placeholder={placeholder} />
            </div>
        )
    )
}
