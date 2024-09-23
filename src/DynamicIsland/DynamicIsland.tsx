import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PixyAvatar from "./assets/pixy.png";
import { IconMessage, IconNotification, IconShare } from "@tabler/icons-react";

enum DYNAMIC_ISLAND_VIEW {
  IDLE = "IDLE",
  SUGGESTIVE = "SUGGESTIVE",
  INTERACTABLE = "INTERACTABLE",
}

type UIStateType = {
  INITIAL_RENDER: boolean;
  VIEW: DYNAMIC_ISLAND_VIEW;
  SHOW_BLUR: boolean;
};

const DYNAMIC_ISLAND_INITIAL_RENDER_DELAY: number = 1500 as const;
const DYNAMIC_ISLAND_INITIAL_RENDER_TOP_DISTANCE: number = 120 as const;

const DynamicIsland = (): JSX.Element => {
  const [UIState, setUIState] = useState<UIStateType>({
    INITIAL_RENDER: false,
    VIEW: DYNAMIC_ISLAND_VIEW.IDLE,
    SHOW_BLUR: false,
  });
  const islandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUIState((currentUIState) => ({
        ...currentUIState,
        INITIAL_RENDER: true,
      }));
    }, DYNAMIC_ISLAND_INITIAL_RENDER_DELAY);

    return () => clearTimeout(timer);
  }, []);

  const handleDynamicIslandShowBlur = () => {
    setUIState((currentUIState) => ({
      ...currentUIState,
      SHOW_BLUR: true,
    }));
    setTimeout(() => {
      setUIState((currentUIState) => ({
        ...currentUIState,
        SHOW_BLUR: false,
      }));
    }, 100);
  };

  const handleDynamicIslandClick = () => {
    handleDynamicIslandShowBlur();
    setUIState((currentUIState) => ({
      ...currentUIState,
      VIEW: DYNAMIC_ISLAND_VIEW.INTERACTABLE,
    }));
  };

  const handleDynamicIslandIdle = () => {
    handleDynamicIslandShowBlur();
    setUIState((currentUIState) => ({
      ...currentUIState,
      VIEW: DYNAMIC_ISLAND_VIEW.IDLE,
    }));
  };

  const handleDynamicIslandSuggestive = () => {
    handleDynamicIslandShowBlur();
    setUIState((currentUIState) => ({
      ...currentUIState,
      VIEW: DYNAMIC_ISLAND_VIEW.SUGGESTIVE,
    }));
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    handleDynamicIslandIdle();

    // Check if the mouse is still over the island
    if (islandRef.current && islandRef.current.contains(e.target as Node)) {
      handleDynamicIslandSuggestive();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={islandRef}
        className="Dynamic-island bg-black mx-auto shadow-2xl rounded-b-2xl w-12 min-w-12 h-12 min-h-12 flex items-center justify-start gap-2"
        initial={{
          opacity: 0,
          y: -DYNAMIC_ISLAND_INITIAL_RENDER_TOP_DISTANCE,
        }}
        animate={{ opacity: 1, y: -12 }}
        whileHover={{
          width: "40%",
          borderBottomLeftRadius: "24px",
          borderBottomRightRadius: "24px",
          justifyContent: "flex-start",
          filter: UIState.SHOW_BLUR ? "blur(4px)" : "none",
        }}
        whileTap={{
          borderRadius: "24px",
          y: 24,
          scale: 1.3,
          height: "120px",
          width: "40%",
          filter: UIState.SHOW_BLUR ? "blur(4px)" : "none",
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 24,
        }}
        onMouseEnter={handleDynamicIslandSuggestive}
        onMouseLeave={handleDynamicIslandIdle}
        onMouseDown={handleDynamicIslandClick}
        onMouseUp={handleMouseUp}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragTransition={{
          bounceDamping: 10,
          bounceStiffness: 100,
        }}
        dragElastic={0.1}
      >
        {UIState.VIEW !== DYNAMIC_ISLAND_VIEW.INTERACTABLE && (
          <>
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              src={PixyAvatar}
              alt="pixy-avatar"
              loading="eager"
              className="w-6 h-6 max-w-6 min-w-6 ml-3 select-none cursor-default mix-blend-difference"
            />
            {UIState.VIEW === DYNAMIC_ISLAND_VIEW.SUGGESTIVE && (
              <>
                <input
                  className="bg-white/20 rounded-full px-2 py-1 text-white text-xs font-semibold placeholder-white/50"
                  disabled
                  placeholder="Ask AI"
                />
                <div className="flex items-center justify-center gap-2 text-white">
                  <IconMessage size={14} stroke={2} />
                  <IconNotification size={14} stroke={2} />
                  <IconShare size={14} stroke={2} />
                </div>
                <div className="flex items-center justify-end gap-2 ml-auto mr-3">
                  <button className="bg-white/20 rounded-full px-3 py-1 text-white text-xs">
                    Translate text
                  </button>
                  <button className="bg-white/20 rounded-full px-3 py-1 text-white text-xs">
                    Show similar images
                  </button>
                </div>
              </>
            )}
          </>
        )}
        {UIState.VIEW === DYNAMIC_ISLAND_VIEW.INTERACTABLE && (
          <>
            <div className="flex items-stretch justify-between w-full h-full p-3 gap-3">
              <div className="Upload-csv-button bg-white/10 border border-dashed border-neutral-600 rounded-xl px-3 py-1 text-white text-xs flex items-center justify-center h-full flex-auto">
                Upload CSV
              </div>
              <div className="Drop-attachments-section bg-white/10 border border-dashed border-neutral-600 rounded-xl p-3 text-white text-xs flex items-center justify-center h-full w-[70%]">
                Drop media attachments here
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export { DynamicIsland };
