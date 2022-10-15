import { useState, useRef, useEffect } from "react";

const useErrMsgs = () => {
  const [errMsgs, setErrMsgs] = useState<string[]>([]);
  const timer = useRef<null | NodeJS.Timeout>(null);

  // Clear error messages after 5 seconds
  useEffect(() => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        timer.current = null;
        return setErrMsgs([]);
      }, 5000);
    }
  }, [errMsgs]);

  return { errMsgs, setErrMsgs };
};

export default useErrMsgs;
