import { useState } from "react";
import { useRef } from "react";
// import IconFile from "../icons/IconFile";

export default function InputImage({
  children,
  onClick,
  width = "150px",
  aspectRatio = "1/1",
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const fileEl = useRef();
  const renderPdf = (src) => <iframe className=" " src={src} />

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    if (file.type === "application/pdf") {
      console.log('PDF yeah')
      // setSelectedPdf()
      onClick(file); // Call onClick after setting state
      return (
        setSelectedPdf(file),
        setSelectedImage(null)
      )
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setSelectedPdf(null);
        onClick(file); // Call onClick after setting state
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <input
        ref={fileEl}
        id="file-upload"
        type="file"
        accept="application/pdf, image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      <div
        onClick={() => fileEl.current.click()}
        style={{
          backgroundImage: selectedImage ? `url(${selectedImage})` : 'none',
          width: `${width}`,
          aspectRatio: `${aspectRatio}`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: 'no-repeat',
        }}
        className="flex justify-center items-center "
      >
        {/* {selectedPdf ? <img src={selectedPdf} alt="Preview" /> : !selectedImage && children} */}
        {/* {selectedPdf ? <IconFile width="200" /> : !selectedImage && children} */}
        {selectedPdf ? renderPdf(URL.createObjectURL(selectedPdf)) : !selectedImage && children}
      </div>
    </>
  );
}
