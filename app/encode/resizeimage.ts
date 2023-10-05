/**
 * 画像をリサイズする関数
 *
 * @export
 * @param {string} imageSrc
 * @param {(number | null)} [resizeWidth]
 * @param {(number | null)} [resizeHeight]
 * @returns {Promise<string>}
 */
export default function resizeImage(
  imageSrc: string,
  resizeWidth?: number | null,
  resizeHeight?: number | null
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("[resizeImage]: cannot create context2D");
      reject();
      return;
    }

    if (!resizeWidth && !resizeHeight) {
      console.error(
        "[resizeImage]: should specify argument of width or height"
      );
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
      resolve(canvas.toDataURL());
    };

    const onerror = () => {
      console.error("[resizeImage]: onerror");
      reject();
      return;
    };

    image.onload = onload;
    image.onerror = onerror;
    image.src = imageSrc;
  });
}
