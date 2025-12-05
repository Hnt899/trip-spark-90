import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { generateRzdStyleTicket } from "@/lib/generateRzdStyleTicket";
import type { EpdData } from "@/types/epd";

interface DownloadTicketModalProps {
  open: boolean;
  onClose: () => void;
  tickets: EpdData[]; // Массив билетов для выбора
}

const DownloadTicketModal = ({
  open,
  onClose,
  tickets,
}: DownloadTicketModalProps) => {
  const handleDownload = async (ticket: EpdData) => {
    try {
      console.log("Начинаем генерацию PDF билета...", ticket);
      const pdfUrl = await generateRzdStyleTicket(ticket);
      console.log("PDF сгенерирован, URL:", pdfUrl);

      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `ticket_${ticket.orderNumber}.pdf`;
      link.style.display = "none";
      document.body.appendChild(link);

      setTimeout(() => {
        link.click();
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(pdfUrl);
        }, 100);
      }, 100);
    } catch (error) {
      console.error("Ошибка при генерации билета:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Скачать билет</DialogTitle>
          <DialogDescription>
            Выберите билет для скачивания
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 mt-4 max-h-[60vh] overflow-y-auto">
          {tickets.map((ticket, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{ticket.passengerFullName}</div>
                <div className="text-sm text-muted-foreground">
                  {ticket.documentSeries} {ticket.documentNumber}
                </div>
              </div>
              <Button onClick={() => handleDownload(ticket)}>
                Скачать
              </Button>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadTicketModal;

