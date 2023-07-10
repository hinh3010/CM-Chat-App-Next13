'use client'
import ChatView from "@/components/ChatView";
import Header from "@/components/Header";
import InputChat from "@/components/InputChat";
export default function Home() {

    // async function handleClick() {
    //     console.log('click')
    //     const pyodide = await loadPyodide({
    //         indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js",
    //         fullStdLib: true
    //     });
    //     console.log("🚀 ~ file: page.jsx:12 ~ handleClick ~ pyodide:", pyodide)
    //     await pyodide.loadPackage(["numpy", "scipy"]);

    //     // const result = await pyodide.runPythonAsync(`
    //     //     import numpy as np
    //     //     import scipy.stats as stats
    //     //     x = np.array([1, 2, 3, 4, 5])
    //     //     mean = np.mean(x)
    //     //     std = np.std(x)
    //     //     t, p = stats.ttest_1samp(x, 3)
    //     //     (mean, std, t, p)
    //     // `);

    //     const adu = pyodide.runPython(`
    //         import numpy
    //         x=numpy.ones((3, 4))
    //     `);

    //     console.log({ adu })
    // }

    return (
        <main className="h-full w-full shadow-lg flex flex-col">
            <section >
                <Header />
            </section>
            <section className="border-2" style={{ overflow: 'overlay' }} >
                <ChatView />
            </section>
            <section>
                <InputChat />
            </section>
        </main>
    )
}
