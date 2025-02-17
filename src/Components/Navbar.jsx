import { FiSave } from "react-icons/fi";
import { MdFileUpload } from "react-icons/md";
import Button from "./Button";
import { enumOptions } from "../utils/EntityType";
import { useContext } from "react";
import { SketcherContext } from "../Context/SketcherInstanceContext";

function Navbar() {
  const sketcher = useContext(SketcherContext);
  const handleClick = (label) => (e) => {
    if (sketcher) {
      sketcher.currentEntityType = label;
      sketcher.isSphereVisible = true;
      // console.log(label);
    }
  };

  const handleSave = () => {
    const sketcherData = {
      entities: sketcher?.mEntities.map((entity) => {
        return {
          mType: entity.mType,
          mName: entity.mName,
          mColor: entity.mColor,
          mConstructionPoints: entity.mConstructionPoints,
          opacity: entity.mOpacity,
          visible: entity.isVisible,
        };
      }),
    };
    const jsonData = JSON.stringify(sketcherData);
    const blob = new Blob([jsonData], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sketcherData.json";
    link.click();
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.log("No file selected.");
      return;
    }
    event.target.value = null;
    // console.log("File selected:", file);

    const reader = new FileReader();
    reader.onload = async function (e) {
      // console.log("File loaded successfully.");

      try {
        const data = await JSON.parse(e.target.result);
        sketcher.readJSONFile(data);
        // console.log("Parsed data:", data);
      } catch (err) {
        console.error("Failed to parse JSON file:", err);
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      <div className="flex mx-7 z-20 h-24">
        <div className="flex bg-gray-200/70 rounded-xl ">
          {enumOptions.map((e, index) => (
            <Button
              name={e.type}
              key={index}
              icon={e.icon}
              value={e.label}
              onClick={handleClick(e.label)}
            />
          ))}
        </div>
        <div className="flex mx-6 ">
          <Button
            name={"Save"}
            className={"mx-4 text-center bg-gray-200/70 rounded-xl"}
            icon={FiSave}
            onClick={handleSave}
          />
          <div
            className={
              "btn hover:bg-gray-200 flex flex-col p-6 text-center gap-1 bg-gray-200/70 rounded-xl"
            }
            onClick={() => document.getElementById("fileInput").click()}
          >
            <input
              type="file"
              className="hidden"
              id="fileInput"
              accept=".json"
              onChange={handleUpload}
            />
            <div className="text-xl mx-auto">
              <MdFileUpload />
            </div>
            <h4>Upload</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
