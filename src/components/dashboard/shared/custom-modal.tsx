"use client";

// Provider
import { useModal } from "@/providers/modal-provider";

// UI components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type Props = {
  heading?: string;
  subheading?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  maxWidth?: string;
};

const CustomModal = ({
  children,
  defaultOpen,
  subheading,
  heading,
  maxWidth,
}: Props) => {
  const { isOpen, setClose } = useModal();
  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent
        className={cn(
          "overflow-y-scroll md:max-h-[700px] md:h-fit h-screen bg-card max-h-100",
          maxWidth
        )}
      >
        <DialogHeader className="text-left">
          {
            <DialogTitle
              className={`text-2xl font-bold ${
                heading ? "" : "hidden opacity-0"
              }`}
            >
              {heading}
            </DialogTitle>
          }

          {subheading && <DialogDescription>{subheading}</DialogDescription>}

          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
