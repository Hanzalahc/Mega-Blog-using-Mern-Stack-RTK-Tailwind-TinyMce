import "./fileUpload.css";
import { IoMdCloudUpload } from "react-icons/io";
import useProvideHooks from "../../hooks/useProvideHooks";
import useApiSubmit from "../../hooks/useApiSubmit";

const FileUpload = ({ files, setFiles }) => {
  const { useState, useRef, apis, showError } = useProvideHooks();
  const { apiSubmit } = useApiSubmit();

  const fileRef = useRef();
  // const [files, setFiles] = useState([]);

  const fileClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const fileChange = async (event) => {
    const formatedArray = Array.from(event.target.files);
    const slicedArray = formatedArray.slice(0, 2 - files.length);

    for (let img of slicedArray) {
      await upload(img);
    }
  };

  const removeHandler = (index) => {
    const copy = [...files];
    copy.splice(index, 1);
    setFiles(copy);
  };

  async function upload(image) {
    const formData = new FormData();
    formData.append("image", image);

    const response = await apiSubmit({
      url: apis().image.url,
      method: apis().image.method,
      values: formData,
      successMessage: "File Uploaded Successfully",
      navigateTo: null,
      showLoadingToast: true,
      loadingMessage: "Uploading File, please wait...",
    });

    if (response.status || response.success) {
      setFiles((prevFile) => [...prevFile, response.image]);
    }
  }

  return (
    <div className="file_upload_main">
      <div onClick={fileClick} className="file_upload_section">
        <input
          ref={fileRef}
          type="file"
          onChange={fileChange}
          accept="image/png,image/jpeg,image/jpg,image/webp"
          multiple
          style={{ display: "none" }}
        />
        <IoMdCloudUpload />
        <span>Upload Images</span>
      </div>
      <div className="file_previews">
        {files?.map((item, index) => {
          return (
            <div className="single_preview" key={index}>
              <img src={item} alt="file preview" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FileUpload;
