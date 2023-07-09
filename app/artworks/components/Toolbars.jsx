import React, { useState } from 'react'
import Select from './Select';
import ButtonGroup from './ButtonGroup';
import Input from './Input';

const options = [
    { value: "fox", label: "🦊 Fox" },
    { value: "Butterfly", label: "🦋 Butterfly" },
    { value: "Honeybee", label: "🐝 Honeybee" }
];

export default function Toolbars() {

    const [animal, setAnimal] = useState(null);

    const handleChange = value => {
        console.log("value:", value);
        setAnimal(value);
    };

    return (
        <div
            role="status"
            className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
            style={{ fontSize: '16px' }}
        >
            <div className='w-[600px] h-24 bg-white py-2 px-4 flex items-center justify-center'>
                <Select />
                <ButtonGroup />
                <Input />
                <button
                    type="button"
                    className="px-4 h-[40px] rounded-md shadow-sm py-2 text-xl font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                    Messages
                </button>
            </div>
        </div>
    )
}
