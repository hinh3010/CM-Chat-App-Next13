import { fabric } from 'fabric';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { artworkDetailSelector } from '~/stores/reducers/artworkDetail.reducer';

function Canvas() {
    const { editorContainer } = useSelector(artworkDetailSelector);
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current, {
            width: 638,
            height: 808,
        });

        const rect = new fabric.Rect({ left: 100, top: 100, width: 50, height: 50, fill: 'red' });
        const circle = new fabric.Circle({ left: 200, top: 200, radius: 25, fill: 'blue' });

        const imageBitmap = createImageBitmap('https://source.unsplash.com/256x256')
        const imageLayer = new fabric.Image(imageBitmap, {
            left: 0,
            top: 0,
            width: canvas.width,
            height: canvas.height,
        });

        canvas.add(rect, circle, imageLayer);


        // const tileSize = 10;
        // const numRows = Math.ceil(editorContainer.height / tileSize);
        // const numCols = Math.ceil(editorContainer.width / tileSize);

        // for (let row = 0; row < numRows; row++) {
        //     for (let col = 0; col < numCols; col++) {
        //         const isWhite = (row + col) % 2 === 0;
        //         const rect = new fabric.Rect({
        //             left: col * tileSize,
        //             top: row * tileSize,
        //             fill: isWhite ? '#ffffff' : '#dadada',
        //             width: tileSize,
        //             height: tileSize,
        //             selectable: false,
        //         });
        //         canvas.add(rect);
        //     }
        // }

        canvas.renderAll()
        //   const resizeHandler = () => canvas.renderAll();
        // window.addEventListener('resize', resizeHandler);
        // return () => window.removeEventListener('resize', resizeHandler);
    }, []);

    return <canvas ref={canvasRef} />;
}

export default Canvas;