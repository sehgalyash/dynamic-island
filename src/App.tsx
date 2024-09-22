import { DynamicIsland } from "./DynamicIsland";
import { motion } from "framer-motion";

const App = () => {
  return (
    <div className="App-container h-screen w-full bg-gradient-to-br from-teal-400 to-indigo-600 p-2">
      <div className="Dashboard-container h-full w-full bg-white rounded-md">
        <motion.div
          className="Dashboard-header w-full h-[340px]"
          initial={{ y: -38 }}
          whileHover={{ y: 0 }}
        >
          <DynamicIsland />
        </motion.div>
      </div>
    </div>
  );
};

export default App;
