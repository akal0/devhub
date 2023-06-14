import useNotifStore from "@/store/useNotifStore";
import "@/styles/globals.css";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";

export default function App({
  Component,
  pageProps
}) {
  const { message, closeNotif } = useNotifStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      closeNotif();
    }, 4000);

    return () => clearTimeout(timer);
  }, [message, closeNotif]);

  return (
    <RecoilRoot>
      <Component {...pageProps} />

      {message && (
        <div
          className="bg-[#1e1e22] fixed bottom-5 right-8 text-white w-max xl:w-max rounded-md px-8"
          id="notification"
        >
          <div className="relative flex justify-center items-center w-full py-4 text-sm">
            <div className="flex justify-center px-4 h-max">
              {message}
            </div>
          </div>
        </div>
      )}
    </RecoilRoot>
  );
}
