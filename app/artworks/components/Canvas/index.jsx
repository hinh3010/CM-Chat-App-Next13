import { fabric } from "fabric";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { artworkDetailSelector } from "~/stores/reducers/artworkDetail.reducer";

export default function Canvas() {
    const canvasRef = useRef(null);
    const editor = useRef(null);
    const { editorContainer } = useSelector(artworkDetailSelector);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = new fabric.Canvas(canvasRef.current, {
            height: editorContainer.height,
            width: editorContainer.width,
        });

        editor.current = canvas;

        canvas.on("mouse:wheel", function (opt) {
            const delta = opt.e.deltaY;
            const pointer = canvas.getPointer(opt.e);
            let zoom = canvas.getZoom() * 0.999 ** delta;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.1) zoom = 0.1;
            const zoomPoint = new fabric.Point(pointer.x, pointer.y);

            canvas.zoomToPoint(zoomPoint, zoom);
            opt.e.preventDefault();
            opt.e.stopPropagation();
        });

        canvas.on("mouse:down", function (opt) {
            var evt = opt.e;
            if (evt.ctrlKey === true) {
                this.isDragging = true;
                this.selection = false;
                this.lastPosX = evt.clientX;
                this.lastPosY = evt.clientY;
            }
        });

        canvas.on("mouse:move", function (opt) {
            if (this.isDragging) {
                var e = opt.e;
                var vpt = this.viewportTransform;
                vpt[4] += e.clientX - this.lastPosX;
                vpt[5] += e.clientY - this.lastPosY;
                this.requestRenderAll();
                this.lastPosX = e.clientX;
                this.lastPosY = e.clientY;
            }
        });


        canvas.on("mouse:up", function () {
            // on mouse up we want to recalculate new interaction
            // for all objects, so we call setViewportTransform
            this.setViewportTransform(this.viewportTransform);
            this.isDragging = false;
            this.selection = true;
        });

        addTextLayer('adu')
        addTextLayer('hello cac ban tre')

        return () => canvas.dispose();
    }, [editorContainer.height, editorContainer.width]);

    const addTextLayer = (text = 'ec', options = {}) => {
        /**
         * @type {fabric.Canvas}
         */
        const canvas = editor.current;
        const textLayer = new fabric.IText(text, {
            left: 0,
            top: 0,
            // originX: 'center', originY: 'center',
            ...options,
        });
        canvas.add(textLayer);
        canvas.renderAll();
    }

    // const addImageLayer = (imageUrl = 'https://source.unsplash.com/256x256', options = {}) => {
    //     /**
    //      * @type {fabric.Canvas}
    //      */
    //     const canvas = editor.current;
    //     const imgElement = new Image();

    //     imgElement.src = imageUrl;
    //     imgElement.onload = function () {
    //         const fabricImage = new fabric.Image(imgElement, {
    //             left: 0,
    //             top: 0,
    //             ...options,
    //         });
    //         canvas.add(fabricImage);
    //         canvas.renderAll();
    //     };
    // }

    const addImageLayer = (imageUrl = 'https://source.unsplash.com/256x256', options = {}) => {
        /**
         * @type {fabric.Canvas}
         */
        const canvas = editor.current;

        // Create a temporary loading rectangle
        const loadingRect = new fabric.Rect({
            left: canvas.width / 2 - 50,
            top: canvas.height / 2 - 10,
            width: 100,
            height: 20,
            fill: 'rgba(255, 255, 255, 0.8)',
            stroke: 'rgba(0, 0, 0, 0.5)',
            strokeWidth: 1,
            selectable: false,
        });

        canvas.add(loadingRect);
        canvas.renderAll();

        const imgElement = new Image();
        imgElement.src = imageUrl;
        imgElement.onload = function () {
            const fabricImage = new fabric.Image(imgElement, {
                left: 0,
                top: 0,
                ...options,
            });
            canvas.add(fabricImage);
            canvas.remove(loadingRect); // Remove the loading rectangle
            canvas.renderAll();
        };
    }

    const onFlip = () => {
        /**
         * @type {fabric.Canvas}
         */
        const canvas = editor.current;

        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            activeObject.flipX = !activeObject.flipX;
            canvas.renderAll();
        }
    }

    const onReset = () => {
        /**
         * @type {fabric.Canvas}
         */
        const canvas = editor.current;
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            activeObject.set({ left: 0, top: 0 });
            canvas.renderAll();
        }
    }

    const onClear = () => {
        /**
         * @type {fabric.Canvas}
         */
        const canvas = editor.current;
        canvas.discardActiveObject()
        canvas.clear()
        canvas.renderAll();
    };

    const onFont = () => {
        /**
         * @type {fabric.Canvas}
         */
        const canvas = editor.current;
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            activeObject.set({ "fontFamily": 'math' });
        }
        canvas.renderAll();
    }

    const onRotate = () => {
        /**
         * @type {fabric.Canvas}
         */
        const canvas = editor.current;
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            activeObject.set('angle', activeObject.angle + 90);
            activeObject.setCoords();
            canvas.renderAll();
        }
    }

    return (
        <>
            <button className="m-4 p-4 bg-slate-500" onClick={() => addTextLayer()}>Text</button>
            <button className="m-4 p-4 bg-slate-500" onClick={() => addImageLayer()}>Image</button>
            <button className="m-4 p-4 bg-slate-500" onClick={onFlip}>Flip</button>
            <button className="m-4 p-4 bg-slate-500" onClick={onReset}>Reset</button>
            <button className="m-4 p-4 bg-slate-500" onClick={onFont}>font</button>
            <button className="m-4 p-4 bg-slate-500" onClick={onRotate}>rotate</button>
            <button className="m-4 p-4 bg-slate-500" onClick={onClear}>clear</button>
            <canvas ref={canvasRef} className="fabric-canvas" />
        </>
    );
}