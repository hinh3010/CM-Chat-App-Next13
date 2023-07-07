import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { artworkDetailSelector } from "~/stores/reducers/artworkDetail.reducer";

export default function Canvas() {
    const { editor, onReady } = useFabricJSEditor();
    const { editorContainer } = useSelector(artworkDetailSelector);

    useEffect(() => {
        if (!editor || !fabric) {
            return;
        }

        if (!editor.canvas.__eventListeners["mouse:wheel"]) {
            editor.canvas.on("mouse:wheel", function (opt) {
                var delta = opt.e.deltaY;
                var zoom = editor.canvas.getZoom();
                zoom *= 0.999 ** delta;
                if (zoom > 20) zoom = 20;
                if (zoom < 0.01) zoom = 0.01;
                editor.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
                opt.e.preventDefault();
                opt.e.stopPropagation();
            });
        }

        if (!editor.canvas.__eventListeners["mouse:down"]) {
            editor.canvas.on("mouse:down", function (opt) {
                var evt = opt.e;
                if (evt.ctrlKey === true) {
                    this.isDragging = true;
                    this.selection = false;
                    this.lastPosX = evt.clientX;
                    this.lastPosY = evt.clientY;
                }
            });
        }

        if (!editor.canvas.__eventListeners["mouse:move"]) {
            editor.canvas.on("mouse:move", function (opt) {
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
        }

        if (!editor.canvas.__eventListeners["mouse:up"]) {
            editor.canvas.on("mouse:up", function () {
                // on mouse up we want to recalculate new interaction
                // for all objects, so we call setViewportTransform
                this.setViewportTransform(this.viewportTransform);
                this.isDragging = false;
                this.selection = true;
            });
        }

        editor.canvas.renderAll();
    }, [editor]);

    useEffect(() => {
        if (!fabric || !editor?.canvas) {
            return;
        }
        editor.canvas.setHeight(editorContainer.height);
        editor.canvas.setWidth(editorContainer.width);
        editor.canvas.renderAll();
    }, [editor?.canvas, editorContainer.height, editorContainer.width]);

    useEffect(() => {
        if (!fabric || !editor?.canvas) {
            return;
        }
        addTextLayer(editor.canvas, 'adu')
        addImageToCanvas(editor.canvas, 'https://source.unsplash.com/256x256')
    }, [editor?.canvas]);


    function addTextLayer(canvas, text, options = {}) {
        const textLayer = new fabric.IText(text, {
            left: 0,
            top: 0,
            // originX: 'center', originY: 'center',
            ...options,
        });
        canvas.add(textLayer);
        canvas.renderAll();
    }

    function addImageToCanvas(canvas, imageUrl, options = {}) {
        const imgElement = new Image();
        imgElement.src = imageUrl;
        imgElement.onload = function () {
            const image = new fabric.Image(imgElement, {
                left: 0,
                top: 0,
                // originX: 'center', originY: 'center',
                ...options,
            });
            canvas.add(image);
            canvas.renderAll();
        };
    }

    const onFlip = () => {
        const activeObject = editor.canvas.getActiveObject();
        if (activeObject) {
            activeObject.flipX = !activeObject.flipX;
            editor.canvas.renderAll();
        }
    }

    const onReset = () => {
        const activeObject = editor.canvas.getActiveObject();
        if (activeObject) {
            activeObject.set({ left: 0, top: 0 });
            editor.canvas.renderAll();
        }
    }

    const onClear = () => {
        // editor.canvas._objects.splice(0, editor.canvas._objects.length);
        editor.canvas.discardActiveObject()
        editor.canvas.clear()
        editor.canvas.renderAll();
    };

    const onFont = () => {
        const activeObject = editor.canvas.getActiveObject();
        if (activeObject) {
            activeObject.set({ "fontFamily": 'math' });
        }
        editor.canvas.renderAll();
    }

    const onRotate = () => {
        const activeObject = editor.canvas.getActiveObject();
        if (activeObject) {
            activeObject.set('angle', activeObject.angle + 90);
            activeObject.setCoords();
            editor.canvas.renderAll();
        }
    }

    return (
        <>
            <button className="m-4 p-4 bg-slate-500" onClick={onFlip}>Flip</button>
            <button className="m-4 p-4 bg-slate-500" onClick={onReset}>Reset</button>
            <button className="m-4 p-4 bg-slate-500" onClick={onFont}>font</button>
            <button className="m-4 p-4 bg-slate-500" onClick={onRotate}>rotate</button>
            <button className="m-4 p-4 bg-slate-500" onClick={onClear}>clear</button>
            <FabricJSCanvas className="fabric-canvas" onReady={onReady} /></>
    );
}
