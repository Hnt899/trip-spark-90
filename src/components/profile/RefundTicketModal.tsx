import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Info, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RefundTicketModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderNumber: string;
  totalPrice: number;
  isProcessing?: boolean;
}

const RefundTicketModal = ({
  open,
  onClose,
  onConfirm,
  orderNumber,
  totalPrice,
  isProcessing = false,
}: RefundTicketModalProps) => {
  const serviceFee = Math.round(totalPrice * 0.1);
  const refundAmount = totalPrice - serviceFee;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Возврат денег за билет
          </DialogTitle>
          <DialogDescription>Заказ № {orderNumber}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Возврат оформляется через ЮKassa на карту, с которой была оплата. В
              тестовом режиме деньги на карту не приходят, но операция отображается в
              кабинете ЮKassa. На карту в продакшене обычно 3–7 рабочих дней.
            </AlertDescription>
          </Alert>

          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Сумма заказа:</span>
              <span className="font-medium">{totalPrice.toLocaleString("ru-RU")} ₽</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Сервисный сбор (не возвращается):</span>
              <span className="font-medium text-destructive">
                -{serviceFee.toLocaleString("ru-RU")} ₽
              </span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="font-semibold">Сумма к возврату:</span>
              <span className="font-semibold text-primary">
                {refundAmount.toLocaleString("ru-RU")} ₽
              </span>
            </div>
          </div>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              После возврата билет будет аннулирован. Обмен по этому заказу будет
              недоступен.
            </AlertDescription>
          </Alert>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={onClose} disabled={isProcessing}>
              Отмена
            </Button>
            <Button
              onClick={() => {
                onConfirm();
              }}
              disabled={isProcessing}
            >
              {isProcessing ? "Оформляем возврат…" : "Вернуть деньги"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RefundTicketModal;
