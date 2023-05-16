import GA from "react-ga4";
// import config from  '../config.json'
const useTracker = (type = "Event Type") => {
  const tracker = ({ label, action }) => {
    console.log(label, action);
    GA.event({ label, action, type });
    GA.event({ action: "button clicked" });
  };
  return tracker;
};

export default useTracker;
