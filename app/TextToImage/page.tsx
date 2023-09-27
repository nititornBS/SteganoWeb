"use client";
import html2canvas from "html2canvas";
import React, { useRef, useState } from "react";

export default function TextToImage() {
  const [text, setText] = useState("");
  const [hostImage, setHostImage] = useState(null);
  const [textPosition, setTextPosition] = useState<Number>(1);

  const imageRef = useRef(null);
  const handleHonstImageChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setHostImage(selectedFile);
  };

  const handleTextChange = (e: any) => {
    const textarea = e.target;
    const text = textarea.value;

    // Split the text into lines
    const lines = text.split("\n");

    // Limit the number of lines (rows)
    const maxRows = 20; // Adjust to the desired maximum rows

    if (lines.length > maxRows) {
      // If there are more lines than the allowed maximum
      const truncatedLines = lines.slice(0, maxRows); // Keep only the allowed rows
      textarea.value = truncatedLines.join("\n"); // Update the textarea
      setText(textarea.value); // Update the state with the modified text
    } else {
      setText(text); // Update the state with the original text
    }
  };

  const handlePosition = (p: Number) => {
    setTextPosition(p);
  };

  const handleSaveImage = () => {
    // Create a canvas from the image element
    html2canvas(imageRef.current!).then((canvas) => {
      // Convert the canvas to a data URL
      const dataURL = canvas.toDataURL("image/png");

      // Create a link to download the image
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = "edited-image.png";
      a.click();
    });
  };

  return (
    <div className="h-screen w-full overflow-auto">
      <div className="flex h-[10%] bg-blue-400 items-center">
        <div className="flex text-2xl ml-5">Text-to-Image </div>
      </div>
      <div className="flex h-[90%] w-[100%] flex-col lg:flex-row bg-blue-200 overflow-auto">
        <div className=" w-[100%] h-full lg:w-[30%] flex justify-around items-center flex-col">
          <div className="flex justify-evenly items-center w-[70%] flex-col h-[40%] bg-blue-400 rounded-lg  drop-shadow-lg">
            <div className="text-xl">Select the host image </div>
            {hostImage && (
              <div className="flex justify-center">
                <img
                  src={URL.createObjectURL(hostImage)}
                  alt="Selected Image"
                  className="max-w-[200px] max-h-[150px] border border-red-400"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*,.png"
              onChange={handleHonstImageChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>
          <div className="h-[40%] w-[70%] border-2 flex flex-col items-center bg-blue-400 rounded-2xl ">
            <div className="mt-2 text-xl"> Select the layout of text</div>
            <div className=" grid w-[100%] h-[100%] grid-cols-2">
              <div className="flex justify-center items-center">
                <button
                  className="h-[70%] w-[70%] border text-white bg-slate-500 hover:bg-white hover:text-black  rounded-lg shadow-md"
                  onClick={() => {
                    handlePosition(1);
                  }}
                >
                  Top Left
                </button>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="h-[70%] w-[70%] border text-white bg-slate-500 hover:bg-white hover:text-black  rounded-lg shadow-md"
                  onClick={() => {
                    handlePosition(2);
                  }}
                >
                  Top Right
                </button>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="h-[70%] w-[70%] border text-white bg-slate-500 hover:bg-white hover:text-black  rounded-lg shadow-md"
                  onClick={() => {
                    handlePosition(3);
                  }}
                >
                  Bottom Left
                </button>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="h-[70%] w-[70%] border text-white bg-slate-500 hover:bg-white hover:text-black  rounded-lg shadow-md"
                  onClick={() => {
                    handlePosition(4);
                  }}
                >
                  Bottom Right
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full lg:w-[30%] h-[100%] flex flex-col items-center py-12">
          <div className=" bg-blue-400 h-[93%]  w-[90%] flex-col flex items-center rounded-xl border-2 border-gray-400 drop-shadow-lg">
            <div className="text-xl text-center p-2">This is a text area</div>
            <div>
              <textarea
                className=" p-2"
                placeholder="Enter text"
                value={text}
                onChange={handleTextChange}
                rows={20}
                cols={40}
                style={{
                  resize: "none",
                  whiteSpace: "pre-wrap", // Allow wrapping within textarea
                  overflowWrap: "break-word", // Wrap at word boundaries
                  wordWrap: "break-word", // Wrap at word boundaries for older browsers
                  hyphens: "auto", // Allow hyphenation if needed
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-[40%] h-full flex  flex-col items-center justify-around bg-blue-400 border-3   ">
          <div className=" text-xl drop-shadow-2xl">
            The example image will display here
          </div>

          {hostImage && (
            <div className="flex justify-center ">
              {
                textPosition == 1 ? (
                  <div
                    ref={imageRef}
                    className=""
                    style={{
                      backgroundImage: `url('/path/to/your/image.jpg')`, // Replace with your image path
                      width: "500px",
                      height: "500px",
                      backgroundSize: "cover",
                      position: "relative",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(hostImage)}
                      alt="Sele cted Image"
                      className="max-w-[100%] max-h-[100%]  border border-red-400"
                    />

                    <div className="  absolute z-1 top-0">
                      {text.split("\n").map((line, index) => (
                        <p
                          key={index}
                          className="  flex  mx-2 justify-start w-[97%]  text-white"
                          style={{
                            top: `${index * 30}px`, // Adjust the line spacing as needed
                            left: 0,
                            fontSize: "16px",
                            color: "white",
                            textShadow: "2px 2px 4px #000",
                          }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : textPosition == 2 ? (
                  <div
                    ref={imageRef}
                    className=""
                    style={{
                      backgroundImage: `url('/path/to/your/image.jpg')`, // Replace with your image path
                      width: "500px",
                      height: "500px",
                      backgroundSize: "cover",
                      position: "relative",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(hostImage)}
                      alt="Sele cted Image"
                      className="max-w-[100%] max-h-[100%]  border border-red-400"
                    />
                    <div className="absolute w-[95%] z-1 top-0">
                      {text.split("\n").map((line, index) => (
                        <p
                          key={index}
                          className="  mx-2   flex justify-end w-[99%]  text-white "
                          style={{
                            top: `${index * 30}px`, // Adjust the line spacing as needed
                            // left: {0%},
                            // transform: "translateX(-50%)",
                            fontSize: "16px",
                            color: "white",
                            textShadow: "2px 2px 4px #000",
                          }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : textPosition == 3 ? (
                  <div
                    ref={imageRef}
                    className=""
                    style={{
                      backgroundImage: `url('/path/to/your/image.jpg')`, // Replace with your image path
                      width: "500px",
                      height: "500px",
                      backgroundSize: "cover",
                      position: "relative",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(hostImage)}
                      alt="Sele cted Image"
                      className="max-w-[100%] max-h-[100%]  border border-red-400"
                    />
                    <div className="  absolute z-1 bottom-0">
                      {[...text.split("\n").reverse()].map((line, index) => (
                        <p
                          key={index}
                          className="  mx-2  flex justify-start w-[95%]  text-white"
                          style={{
                            // position: "absolute",
                            bottom: `${index * 30}px`, // Adjust the line spacing as needed
                            // left: "50%",
                            // transform: "translateX(-50%)",
                            fontSize: "16px",
                            color: "white",
                            textShadow: "2px 2px 4px #000",
                          }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : textPosition == 4 ? (
                  <div
                    ref={imageRef}
                    className=""
                    style={{
                      backgroundImage: `url('/path/to/your/image.jpg')`, // Replace with your image path
                      width: "500px",
                      height: "500px",
                      backgroundSize: "cover",
                      position: "relative",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(hostImage)}
                      alt="Sele cted Image"
                      className="max-w-[100%] max-h-[100%]  border border-red-400"
                    />
                    <div className="  absolute w-[95%] z-1 bottom-0">
                      {[...text.split("\n").reverse()].map((line, index) => (
                        <p
                          key={index}
                          className="mx-2 flex  justify-end w-[99%]  text-white"
                          style={{
                            // position: "absolute",
                            bottom: `${index * 30}px`, // Adjust the line spacing as needed
                            // left: "50%",
                            // transform: "translateX(-50%)",
                            fontSize: "16px",
                            color: "white",
                            textShadow: "2px 2px 4px #000",
                          }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : null
                // textPosition ==3?:textPosition==4?:null
              }
            </div>
          )}

          {hostImage && (
            <div className=" w-[100%] h-[7%] flex justify-center  ">
              <button
                onClick={handleSaveImage}
                className=" w-[30%] bg-white drop-shadow-lg   rounded-xl  "
              >
                Save Image
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
