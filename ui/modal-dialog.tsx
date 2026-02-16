import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ReactElement } from "react";

interface modalProps {
    body?: ReactElement;
    footer?: ReactElement;
    isOpen?: boolean;
    onClose?: () => void;
    step?: number;
    totalStep?: number;
    isEditing?: boolean;
}

export default function Modal({
    body,
    footer,
    isOpen,
    onClose,
    step,
    totalStep,
    isEditing,
}: modalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className={cn(
                    "bg-black p-1",
                    isEditing && "h-[80vh] overflow-x-hidden overflow-y-auto",
                )}
            >
                <DialogHeader>
                    <div className="flex gap-10">
                        <div className="cursor-pointer">
                            <X onClick={onClose} />
                        </div>
                        {step && totalStep && (
                            <div className="font-bold text-2xl">
                                Step {step} of {totalStep}
                            </div>
                        )}
                    </div>
                    {body && <div className="">{body}</div>}
                    {footer && <div>{footer}</div>}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
