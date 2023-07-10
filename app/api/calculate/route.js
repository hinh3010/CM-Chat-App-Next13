import { NextResponse } from "next/server";
import { loadPyodide, runPythonAsync } from "pyodide";

/**
 *
 * @param {Request} request
 * @returns
 */
export async function GET(request) {
    try {
        console.log("adu");
        // Khởi tạo Pyodide và tải các module Python cần thiết
        const pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/npm/pyodide@0.23.4/pyodide.min.js",
        });
        await pyodide.loadPackage(["numpy", "scipy"]);

        // Thực thi mã Python
        const result = await runPythonAsync(`
            import numpy as np
            import scipy.stats as stats
            x = np.array([1, 2, 3, 4, 5])
            mean = np.mean(x)
            std = np.std(x)
            t, p = stats.ttest_1samp(x, 3)
            (mean, std, t, p)
        `);

        // Trả về kết quả cho trang web của bạn
        return NextResponse.json({ result });
    } catch (error) {
        return new NextResponse(error.message, { status: error.status || 500 });
    }
}
