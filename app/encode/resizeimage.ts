/**
 * 画像をリサイズしてファイルに保存する関数
 *
 * @export
 * @param {string} imageSrc
 * @param {(number | null)} [resizeWidth]
 * @param {(number | null)} [resizeHeight]
 * @param {string} outputFileName - ダウンロード時のファイル名
 */
export default function resizeImageAndSave(
    imageSrc: string,
    tempImage: any,
    resizeWidth?: number | null,
    resizeHeight?: number | null,
    outputFileName: string = "resized_image.png"
): Promise<void> {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            console.error("[resizeImage]: cannot create context2D");
            reject();
            return;
        }

        if (!resizeWidth && !resizeHeight) {
            console.error("[resizeImage]: should specify argument of width or height");
            reject();
            return;
        }

        const image = new window.Image();

        const onload = () => {
            let width: number = 0;
            let height: number = 0;

            // width,heightどちらも指定がある場合は強制的に縮める
            if (resizeWidth && resizeHeight) {
                width = resizeWidth;
                height = resizeHeight;
                // widthのみ指定の場合, heightはwidthの拡縮に合わせる
            } else if (resizeWidth) {
                width = resizeWidth;
                height = image.height * (resizeWidth / image.width);
                // heightのみ指定の場合, widthはheightの拡縮に合わせる
            } else if (resizeHeight) {
                width = image.width * (resizeHeight / image.height);
                height = resizeHeight;
            }

            width = Math.floor(width);
            height = Math.floor(height);

            console.log("[resizeImage]: resize - width, height", width, height);

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(image, 0, 0, width, height);

            // Convert the canvas to a blob (binary data)
            canvas.toBlob((blob) => {
                if (blob) {
                    // Create a blob URL
                    const blobUrl = URL.createObjectURL(blob);
                    tempImage = blobUrl;
                    // Create a temporary link element to trigger the download
                    //const link = document.createElement("a");
                    //link.href = blobUrl;
                    //link.download = outputFileName;

                    // Trigger the download
                    //link.click();

                    // Clean up
                    //URL.revokeObjectURL(blobUrl);

                    resolve();
                } else {
                    console.error("[resizeImage]: Error converting canvas to blob");
                    reject();
                }
            }, "image/png"); // You can change the MIME type as needed
        };

        const onerror = () => {
            console.error("[resizeImage]: onerror");
            reject();
        };

        image.onload = onload;
        image.onerror = onerror;
        image.src = imageSrc;
    });
}
