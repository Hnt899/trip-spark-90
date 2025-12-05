import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmRegistrationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  routeInfo: string; // Информация о рейсе
}

const ConfirmRegistrationModal = ({
  open,
  onClose,
  onConfirm,
  routeInfo,
}: ConfirmRegistrationModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Подтверждение электронной регистрации</DialogTitle>
          <DialogDescription>
            Вы точно хотите подтвердить электронную регистрацию на рейс {routeInfo}?
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 justify-end mt-4">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={onConfirm}>
            Подтвердить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmRegistrationModal;

