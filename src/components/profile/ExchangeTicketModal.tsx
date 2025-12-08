import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Info, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ExchangeTicketModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderNumber: string;
  totalPrice: number;
}

const ExchangeTicketModal = ({
  open,
  onClose,
  onConfirm,
  orderNumber,
  totalPrice,
}: ExchangeTicketModalProps) => {
  // Пример расчета суммы с учетом сервисного сбора (можно настроить)
  const serviceFee = Math.round(totalPrice * 0.1); // 10% сервисный сбор
  const certificateAmount = totalPrice - serviceFee;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Обмен билета
          </DialogTitle>
          <DialogDescription>
            Заказ № {orderNumber}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Хорошо! Вы получите на почту сертификат/код на сумму этого билета с вычетом сервисного сбора и прочей лабуды, и вы можете использовать этот сертификат при покупке, чтобы получить скидку.
            </AlertDescription>
          </Alert>

          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Сумма заказа:</span>
              <span className="font-medium">{totalPrice.toLocaleString("ru-RU")} ₽</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Сервисный сбор:</span>
              <span className="font-medium text-destructive">-{serviceFee.toLocaleString("ru-RU")} ₽</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="font-semibold">Сумма сертификата:</span>
              <span className="font-semibold text-primary">{certificateAmount.toLocaleString("ru-RU")} ₽</span>
            </div>
          </div>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Важно:</strong> Сертификаты нельзя передавать между аккаунтами и использовать можно будет только на этом аккаунте.
            </AlertDescription>
          </Alert>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button onClick={() => {
              onConfirm();
              onClose();
            }}>
              Обменять билет
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExchangeTicketModal;

