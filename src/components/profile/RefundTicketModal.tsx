import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Info, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RefundTicketModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderNumber: string;
  totalPrice: number;
}

const RefundTicketModal = ({
  open,
  onClose,
  onConfirm,
  orderNumber,
  totalPrice,
}: RefundTicketModalProps) => {
  // Пример расчета суммы с учетом сервисных сборов (можно настроить)
  const serviceFee = Math.round(totalPrice * 0.1); // 10% сервисный сбор
  const refundAmount = totalPrice - serviceFee;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Возврат денег за билет
          </DialogTitle>
          <DialogDescription>
            Заказ № {orderNumber}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Деньги были возвращены
            </AlertDescription>
          </Alert>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Деньги поступят на карту от 3 до 7 дней с учетом вычета всех сервисных сборов.
              <br />
              <strong>Важно:</strong> Сертификат на сумму сертификата будет отправлен на вашу почту. 
              Неиспользованные сертификаты хранятся в течение месяца, затем списываются.
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
              <span className="font-semibold">Сумма к возврату:</span>
              <span className="font-semibold text-primary">{refundAmount.toLocaleString("ru-RU")} ₽</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button onClick={() => {
              onConfirm();
              onClose();
            }}>
              Понятно
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RefundTicketModal;

