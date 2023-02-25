import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const usePath = () => {
  const router = useRouter();
  const [basePath, setBasePath] = useState<string | undefined>();
  const [recordPath, setRecordPath] = useState<string | undefined>();

  const getRecordPath = () =>
    router.pathname.startsWith("/records/") &&
    router.pathname.split("/records/").length === 2
      ? router.pathname.split("/records/")[1]
      : undefined;

  useEffect(() => {
    setRecordPath(getRecordPath());
    setBasePath(router.pathname);
  }, [router]);

  return { basePath, recordPath };
};

export default usePath;
