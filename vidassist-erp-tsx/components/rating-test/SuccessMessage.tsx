import Image from "next/image";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const successVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "backIn",
      duration: 0.6,
    },
  },
};

const SuccessMessage = () => {
  const refresh = () => window.location.reload();
  return (
    <>
      <Image
        src={""}
        width="150"
        height="150"
        alt="Success Icon"
        className="md:mb-4"
      />
      <h4 className="text-2xl font-semibold text-white md:text-3xl">
        Thank you!
      </h4>
      <p className="text-sm max-w-md text-neutral-300 md:text-base">
        Thanks for confirming your subscription! We hope you have fun using our
        plataform. If you ever need support, please feel free to email us at
        support@loremgaming.com
      </p>
      <div className="flex items-center mt-6">
        <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
          <Button
            onClick={refresh}
            className="relative text-neutral-200 bg-neutral-900 border border-black/20 shadow-input shadow-black/10 rounded-xl hover:text-white"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Restart
          </Button>
        </div>
      </div>
    </>
  );
};

export default SuccessMessage;
