import useNavigateStore from "../stores/useNavigate";
import { projects } from "../data";
import { PORTAL_SEPARATION, STAND_X_FROM_PORTAL } from "../constants";

const useMoveCharacter = () => {
  function setCurrentAction(actionName) {
    useNavigateStore.setState({ currentAction: actionName });
  }

  function setRotation(rotation) {
    useNavigateStore.setState({ targetRotation: rotation });
  }

  const moveCharacter = (newTarget) => {
    // Don't allow move until target section reached and player is not zoomed in on something
    const focus = useNavigateStore.getState().focus;
    const targetSection = useNavigateStore.getState().targetSection;
    const currentSection = useNavigateStore.getState().currentSection;
    const actions = useNavigateStore.getState().actions;

    if (targetSection !== currentSection || focus.current.name !== "avatar") return;
    if (newTarget === currentSection) return;
    if (newTarget < 0 || newTarget > projects.length + 1) return;

    if (newTarget === "THUMBSUP") {
      const thumbsDuration = actions["THUMBSUP"]._clip.duration * 1000;
      setCurrentAction("THUMBSUP");
      setTimeout(() => {
        setCurrentAction("IDLE");
      }, thumbsDuration);
      return;
    }
    let delay = 0;

    useNavigateStore.setState({ targetSection: newTarget });
    const moveRight = newTarget - currentSection > 0;
    const turnDuration = actions["TURNLEFT"]._clip.duration * 1000;
    const walkDuration = actions["WALKING"]._clip.duration * 1000;
    const runDuration = actions["RUNNING"]._clip.duration * 4000;
    const waveDuration = actions["WAVING"]._clip.duration * 1000;

    let rotation = useNavigateStore.getState().targetRotation;

    // Start movement
    if (currentSection === projects.length + 1) {
      // if last section
      setCurrentAction("TURNRIGHT");
      rotation += -Math.PI / 2;
      setRotation(rotation);
      delay += turnDuration;
    } else if (currentSection === 0 || !moveRight) {
      setCurrentAction("TURNLEFT");
      rotation += Math.PI / 2;
      setRotation(rotation);

      delay += turnDuration;
    } else {
      // If moving right
      setCurrentAction("TURNRIGHT");
      rotation += -Math.PI / 2;
      setRotation(rotation);
      delay += turnDuration;
    }

    setTimeout(() => {
      const offset = newTarget === 0 ? 0 : STAND_X_FROM_PORTAL;
      setCurrentAction("WALKING");
      useNavigateStore.setState({ targetPosition: newTarget * PORTAL_SEPARATION + offset });
    }, delay);
    delay += walkDuration;

    setTimeout(() => {
      setCurrentAction("RUNNING");
    }, delay);
    delay += runDuration;

    setTimeout(() => {
      setCurrentAction("WALKING");
    }, delay);
    delay += walkDuration;

    if (newTarget === 0) {
      setTimeout(() => {
        useNavigateStore.setState({ currentSection: newTarget });
        setCurrentAction("TURNLEFT");
        rotation += Math.PI / 2;
        setRotation(rotation);
      }, delay);
      delay += turnDuration;

      setTimeout(() => {
        setCurrentAction("WAVING");
      }, delay);
      delay += waveDuration;

      setTimeout(() => {
        setCurrentAction("IDLE");
      }, delay);
    } else if (newTarget === projects.length + 1 || !moveRight) {
      setTimeout(() => {
        useNavigateStore.setState({ currentSection: newTarget });
        setCurrentAction("TURNRIGHT");
        rotation += -Math.PI / 2;
        setRotation(rotation);
      }, delay);
      delay += turnDuration;

      setTimeout(() => {
        setCurrentAction("IDLE");
      }, delay);
    } else {
      setTimeout(() => {
        useNavigateStore.setState({ currentSection: newTarget });
        setCurrentAction("TURNLEFT");
        rotation += Math.PI / 2;
        setRotation(rotation);
      }, delay);
      delay += turnDuration;

      setTimeout(() => {
        setCurrentAction("IDLE");
      }, delay);
    }
  };

  return moveCharacter;
};

export default useMoveCharacter;
