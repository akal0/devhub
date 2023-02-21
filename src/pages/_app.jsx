import useNotifStore from "@/store/useNotifStore";
import "@/styles/globals.css";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const { message, closeNotif } = useNotifStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      closeNotif();
    }, 4000);

    return () => clearTimeout(timer);
  }, [message, closeNotif]);

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />

      {message && (
        <div
          className="bg-[#1e1e22] fixed bottom-5 right-8 text-white w-3/4 xl:w-1/4 rounded-md"
          id="notification"
        >
          <div className="relative flex justify-center items-center w-full py-6">
            <div className="w-full flex justify-center px-6 h-max ">
              {message}
            </div>
          </div>
        </div>
      )}
    </SessionProvider>
  );
}
