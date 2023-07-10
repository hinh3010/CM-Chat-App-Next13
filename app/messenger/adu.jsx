
'use client'
import { useEffect, useState } from 'react';
const runScript = async (code) => {
    const pyodide = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/"
    });

    return await pyodide.runPython(code);
}

export default function PyodideExample() {
    const [result, setResult] = useState(null);

    async function handleClick() {
        // Khởi tạo Pyodide và tải các module Python cần thiết
        // const pyodide = await loadPyodide({
        //     indexURL: 'https://cdn.jsdelivr.net/npm/pyodide@0.23.4/',
        //     fullStdLib: true,
        // });

        // const adu = pyodide.runPython(`
        //     import numpy
        //     x=numpy.ones((3, 4))
        // `);

        // console.log({ adu })
        //     console.log({ pyodide })
        //     await pyodide.loadPackage(['numpy', 'scipy']);

        //     // Thực thi mã Python
        //     const result = await pyodide.runPythonAsync(`
        //   import numpy as np
        //   import scipy.stats as stats
        //   x = np.array([1, 2, 3, 4, 5])
        //   mean = np.mean(x)
        //   std = np.std(x)
        //   t, p = stats.ttest_1samp(x, 3)
        //   (mean, std, t, p)
        // `);

        //     // Lưu kết quả vào state của component
        //     setResult(result);
    }

    const [output, setOutput] = useState("(loading...)");

    useEffect(() => {
        const run = async () => {
            const scriptText = `
            def func():
            return 5 + 7
            func()
        `
            console.log("🚀 ~ file: adu.jsx:52 ~ run ~ scriptText:", scriptText)
            const out = await runScript(scriptText);
            setOutput(out);
        }
        run();

    }, []);

    return (
        <div>
            <button onClick={handleClick}>Calculate</button>
            {result && (
                <ul>
                    <li>Mean: {result[0]}</li>
                    <li>Standard Deviation: {result[1]}</li>
                    <li>t-value: {result[2]}</li>
                    <li>p-value: {result[3]}</li>
                </ul>
            )}
        </div>
    );
}