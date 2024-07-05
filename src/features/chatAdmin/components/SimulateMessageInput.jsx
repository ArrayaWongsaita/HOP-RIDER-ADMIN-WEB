import { useState } from "react";

const SimulateMessageInput = ({ onSimulateSend }) => {
  const [simulateInputValue, setSimulateInputValue] = useState("");

  const handleSimulateSend = () => {
    if (simulateInputValue.trim() !== "") {
      onSimulateSend(simulateInputValue);
      setSimulateInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSimulateSend();
    }
  };

  return (
    <div className="flex items-center mt-4">
      <input
        type="text"
        className="flex-1 p-2 border rounded-lg"
        value={simulateInputValue}
        onChange={(e) => setSimulateInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="พิมพ์ข้อความจำลอง..."
      />
      <button
        className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg"
        onClick={handleSimulateSend}
      >
        Simulate Send
      </button>
    </div>
  );
};

export default SimulateMessageInput;
