import useNavigateStore from "../stores/useNavigate";
import { projects } from "../data";

const useMoveCharacter = () => {
  const currentSection = useNavigateStore((state) => state.currentSection);
  const setCurrentSection = useNavigateStore((state) => state.setCurrentSection);
  const targetSection = useNavigateStore((state) => state.targetSection);
  const setTargetSection = useNavigateStore((state) => state.setTargetSection);
  const focus = useNavigateStore((state) => state.focus);

  function moveCharacter(newTarget) {
    // Don't allow move until target section reached and player is not zoomed in on something
    if (targetSection !== currentSection || focus !== "player") return;
    if (newTarget < 0 || newTarget > projects.length + 1) return;

    const moveRight = newTarget - currentSection > 0;
    console.log(newTarget);
    setTargetSection(newTarget);
    setCurrentSection(newTarget);
  }

  return moveCharacter;
};

export default useMoveCharacter;
