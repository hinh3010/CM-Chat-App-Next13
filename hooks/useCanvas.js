/* eslint-disable react-hooks/exhaustive-deps */
import { fabric } from "fabric";
import { useCallback, useEffect, useRef } from "react";

const DEV_MODE = process.env.NODE_ENV === "development";

/**
 * @param {(canvas: fabric.Canvas) => any} init 
 * @param {boolean|false} saveState 
 * @param {any[] | []} deps 
 * @returns 
 */
export function useCanvas(
    init,
    saveState = false,
    deps
) {
    const elementRef = useRef < HTMLCanvasElement > (null);
    /**
     * @type {fabric.Canvas | null}
     */
    const fc = useRef(null);
    const data = useRef(null);

    const setRef = useCallback(
        /**
         * @param {HTMLCanvasElement | null} ref 
         */
        (ref) => {
            //@ts-ignore
            elementRef.current = ref;
            // save state
            if (DEV_MODE && saveState && fc.current) {
                data.current = fc.current.toJSON();
            }
            // dispose canvas
            fc.current?.dispose();
            // set/clear ref
            if (!ref) {
                fc.current = null;
                return;
            }
            const canvas = new fabric.Canvas(ref, { backgroundColor: "white" });
            fc.current = canvas;
            // invoke callback
            init && init(canvas);
            // restore state
            if (DEV_MODE && saveState && data.current) {
                canvas.loadFromJSON(data.current);
            }
        },
        [saveState, ...deps]
    );
    useEffect(() => {
        // disposer
        return () => {
            // save state
            if (DEV_MODE && saveState && fc.current) {
                data.current = fc.current.toJSON();
            }
            // we avoid unwanted disposing by doing so only if element ref is unavailable
            if (!elementRef.current) {
                fc.current?.dispose();
                fc.current = null;
            }
        };
    }, [saveState]);
    return [fc, setRef];
}
