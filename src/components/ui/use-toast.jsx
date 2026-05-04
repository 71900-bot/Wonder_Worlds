// Inspired by react-hot-toast library
import { useState, useEffect } from "react";

/**
 * @typedef {{
 *   id: string;
 *   title?: string;
 *   description?: string;
 *   action?: import("react").ReactNode;
 *   open?: boolean;
 *   onOpenChange?: (open: boolean) => void;
 * }} ToastItem
 * @typedef {{ toasts: ToastItem[] }} ToastState
 * @typedef {{ type: typeof actionTypes.ADD_TOAST; toast: ToastItem }} ToastAddToastAction
 * @typedef {{ type: typeof actionTypes.UPDATE_TOAST; toast: ToastItem }} ToastUpdateToastAction
 * @typedef {{ type: typeof actionTypes.DISMISS_TOAST; toastId?: string }} ToastDismissAction
 * @typedef {{ type: typeof actionTypes.REMOVE_TOAST; toastId?: string }} ToastRemoveAction
 * @typedef {ToastAddToastAction | ToastUpdateToastAction | ToastDismissAction | ToastRemoveAction} ToastAction
 */

const TOAST_LIMIT = 20;
const TOAST_REMOVE_DELAY = 1000000;

/** @enum {string} */
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
};

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

/** @type {Map<string, ReturnType<typeof setTimeout>>} */
const toastTimeouts = new Map();

/**
 * @param {string} toastId
 */
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: actionTypes.REMOVE_TOAST,
      toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

/**
 * @param {string} toastId
 */
const _clearFromRemoveQueue = (toastId) => {
  const timeout = toastTimeouts.get(toastId);
  if (timeout) {
    clearTimeout(timeout);
    toastTimeouts.delete(toastId);
  }
};

/**
 * @param {ToastState} state
 * @param {ToastAction} action
 * @returns {ToastState}
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOAST: {
      const toastAction = /** @type {ToastAddToastAction} */ (action);
      return {
        ...state,
        toasts: [toastAction.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    }

    case actionTypes.UPDATE_TOAST: {
      const toastAction = /** @type {ToastUpdateToastAction} */ (action);
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastAction.toast.id ? { ...t, ...toastAction.toast } : t
        ),
      };
    }

    case actionTypes.DISMISS_TOAST: {
      const dismissAction = /** @type {ToastDismissAction} */ (action);
      const { toastId } = dismissAction;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case actionTypes.REMOVE_TOAST: {
      const removeAction = /** @type {ToastRemoveAction} */ (action);
      if (removeAction.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== removeAction.toastId),
      };
    }
  }
  return state;
};

/** @type {Array<(state: ToastState) => void>} */
const listeners = [];

/** @type {ToastState} */
let memoryState = { toasts: [] };

/**
 * @param {ToastAction} action
 */
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

/**
 * @param {ToastItem} props
 */
function toast(props) {
  const id = genId();

  /** @param {Partial<ToastItem>} updateProps */
  const update = (updateProps) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: { ...updateProps, id },
    });

  const dismiss = () =>
    dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = useState(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    /** @param {string | undefined} toastId */
    dismiss: (toastId) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  };
}

export { useToast, toast };
 