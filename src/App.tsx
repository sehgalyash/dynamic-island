import { DynamicIsland } from "./DynamicIsland";
import { motion } from "framer-motion";

const App = () => {
  return (
    <div className="App-container h-screen w-full dashboard-gradient p-2">
      <div className="Dashboard-container h-full w-full bg-white rounded-md mix-blend-screen">
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
