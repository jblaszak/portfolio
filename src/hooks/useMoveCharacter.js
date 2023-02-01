import useNavigateStore from "../stores/useNavigate";
import { useState, useEffect } from "react";
import { projects } from "../data";
import { PORTAL_SEPARATION } from "../constants";

const useMoveCharacter = () => {
  const actions = useNavigateStore((state) => state.actions);
  const currentSection = useNavigateStore((state) => state.currentSection);
  const setCurrentSection = useNavigateStore((state) => state.setCurrentSection);
  const targetSection = useNavigateStore((state) => state.targetSection);
  const setTargetSection = useNavigateStore((state) => state.setTargetSection);
  const setTargetPosition = useNavigateStore((state) => state.setTargetPosition);
  const updateRotation = useNavigateStore((state) => state.updateRotation);

  const focus = useNavigateStore((state) => state.focus);

  const [currentAction, setCurrentAction] = useState("IDLE");
  const fadeDuration = 0.5;

  useEffect(() => {
    if (!actions || !currentAction) return;
    const action = actions[currentAction];
    action.reset().fadeIn(fadeDuration).play();
    return () => action.fadeOut(fadeDuration);
  }, [currentAction, actions]);

  function moveCharacter(newTarget) {
    // Don't allow move until target section reached and player is not zoomed in on something
    if (targetSection !== currentSection || focus !== "player") return;
    if (newTarget < 0 || newTarget > projects.length + 1) return;

    setTargetSection(newTarget);
    const moveRight = newTarget - currentSection > 0;
    let delay = 0;
    const turnDuration = actions["TURNLEFT"]._clip.duration * 1000;
    const walkDuration = actions["WALKING"]._clip.duration * 1000;
    const runDuration = actions["RUNNING"]._clip.duration * 4000;
    const waveDuration = actions["WAVING"]._clip.duration * 1000;

    // Start movement
    if (currentSection === 0 || !moveRight) {
      setCurrentAction("TURNLEFT");
      updateRotation(Math.PI / 2);
      delay += turnDuration;
    } else {
      // If moving right or at last section
      setCurrentAction("TURNRIGHT");
      updateRotation(-Math.PI / 2);
      delay += turnDuration;
    }

    setTimeout(() => {
      setCurrentAction("WALKING");
      setTargetPosition(newTarget * PORTAL_SEPARATION);
    }, delay);
    delay += walkDuration;

    setTimeout(() => {
      setCurrentAction("RUNNING");
    }, delay);
    delay += runDuration;

    setTimeout(() => {
      setCurrentAction("WALKING");
      setCurrentSection(newTarget);
    }, delay);
    delay += walkDuration;

    if (newTarget === 0) {
      setTimeout(() => {
        setCurrentAction("TURNLEFT");
        updateRotation(Math.PI / 2);
      }, delay);
      delay += turnDuration;

      setTimeout(() => {
        setCurrentAction("WAVING");
      }, delay);
      delay += waveDuration;

      setTimeout(() => {
        setCurrentAction("IDLE");
      }, delay);
    } else if (newTarget === projects.length || !moveRight) {
      setTimeout(() => {
        setCurrentAction("TURNRIGHT");
        updateRotation(-Math.PI / 2);
      }, delay);
      delay += turnDuration;

      setTimeout(() => {
        setCurrentAction("IDLE");
      }, delay);
    } else {
      setTimeout(() => {
        setCurrentAction("TURNLEFT");
        updateRotation(Math.PI / 2);
      }, delay);
      delay += turnDuration;

      setTimeout(() => {
        setCurrentAction("IDLE");
      }, delay);
    }
  }

  return moveCharacter;
};

export default useMoveCharacter;
