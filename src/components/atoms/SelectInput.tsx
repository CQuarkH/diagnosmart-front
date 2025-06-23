import React, { type JSX } from 'react';

interface Option {
    label: string;
    value: string;
}

interface SelectInputProps {
    title?: string;
    placeholder?: string;
    options: Option[];
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectInput({
    title,
    placeholder,
    options,
    name = '',
    value,
    onChange,
}: SelectInputProps): JSX.Element {
    const isControlled = typeof value === 'string' && typeof onChange === 'function';

    return (
        <div className="flex flex-col gap-4">
            {title && <span>{title}</span>}

            <select
                name={name}
                {...(isControlled
                    ? { value, onChange }
                    : { defaultValue: '' })}
                className="
          border
          border-gray-300
          rounded-lg
          p-2
          focus:outline-none
          focus:ring-1
          focus:ring-primary
        "
            >
                {placeholder && (
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                )}

                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
