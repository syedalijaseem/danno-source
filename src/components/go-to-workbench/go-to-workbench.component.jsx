import React, { useState } from "react";
import { storage } from "../../utils/firebase/firebase.utils";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import ImageAnnotationTool from "../workbench/workbench.component";

const WorkbenchLink = ({
  expert_id,
  freelancer_id,
  job_id,
  proposal_id,
  classifications,
}) => {
  const [imageUrls, setImageUrls] = useState([]);

  const fetchImagesfromDB = async () => {
    const folderPath = `users/${expert_id.trim()}/${job_id.trim()}`;
    const imagesRef = ref(storage, folderPath);

    const urls = await listAll(imagesRef).then((res) => {
      return Promise.all(res.items.map((item) => getDownloadURL(item)));
    });

    setImageUrls(urls);
  };

  const renderContent = () => {
    if (imageUrls.length > 0) {
      console.log("Images", imageUrls);
      return (
        <ImageAnnotationTool
          imageUrl={imageUrls}
          regionClsList={classifications}
        />
      );
    } else {
      return <button onClick={fetchImagesfromDB}>Go to Workbench</button>;
    }
  };

  return <div>{renderContent()}</div>;
};

export default WorkbenchLink;
