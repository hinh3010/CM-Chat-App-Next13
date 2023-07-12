
'use client'
import { loadPyodide } from 'pyodide';

export default function PyodideExample() {
    async function handleClick() {
        try {
            const pyodide = await loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/',
                fullStdLib: true,
            });

            pyodide.runPython(`
                import numpy
                x=numpy.ones((3, 4))
            `);

            // await pyodide.loadPackage(['numpy', 'scipy']);

            const result = await pyodide.runPythonAsync(`
            def func():
                return 5 + 7
    
            func()`);

            console.log('🚀 hello cac ban tre ~ file: adu.jsx:29 ~ handleClick ~ result~', result)
        } catch (error) {
            console.log('🚀 hello cac ban tre ~ file: adu.jsx:29 ~ handleClick ~ error~', error)
        }
    }

    return (
        <div>
            <button onClick={handleClick}>Calculate</button>
        </div>
    );
}