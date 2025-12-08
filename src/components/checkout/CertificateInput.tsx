import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, Gift, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface Certificate {
  id: string;
  certificate_code: string;
  amount: number;
  transport_type: string;
  expires_at: string;
}

interface CertificateInputProps {
  value: string;
  onChange: (code: string) => void;
  transportType: string;
  onCertificateSelect: (certificate: Certificate | null) => void;
  onCertificateError?: (error: string | null) => void;
  userId: string | undefined;
}

const CertificateInput = ({
  value,
  onChange,
  transportType,
  onCertificateSelect,
  onCertificateError,
  userId,
}: CertificateInputProps) => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId && transportType) {
      loadCertificates();
    }
  }, [userId, transportType]);

  const loadCertificates = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .eq("user_id", userId)
        .eq("transport_type", transportType)
        .eq("status", "active")
        .gt("expires_at", new Date().toISOString())
        .order("amount", { ascending: false });

      if (error) {
        console.error("Error loading certificates:", error);
      } else {
        setCertificates(data || []);
      }
    } catch (error) {
      console.error("Error loading certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCertificateClick = (cert: Certificate) => {
    onChange(cert.certificate_code);
    onCertificateSelect(cert);
    setOpen(false);
  };

  const getTransportTypeLabel = (type: string) => {
    switch (type) {
      case "train":
        return "Поезд";
      case "flight":
        return "Самолёт";
      case "bus":
        return "Автобус";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="certificate">Сертификат (необязательно)</Label>
      <div className="relative">
        <Input
          id="certificate"
          placeholder="Введите код сертификата или выберите из списка"
          value={value}
          onChange={async (e) => {
            const code = e.target.value.replace(/\D/g, '').slice(0, 10); // Только цифры, максимум 10
            onChange(code);
            
            // Если введен полный код, проверяем его
            if (code.length === 10) {
              const cert = certificates.find(c => c.certificate_code === code);
              if (cert) {
                onCertificateSelect(cert);
                setError(null);
                onCertificateError?.(null);
              } else {
                // Проверяем сертификат в базе данных, если не найден в списке
                try {
                  const { data, error: dbError } = await supabase
                    .from("certificates")
                    .select("*")
                    .eq("certificate_code", code)
                    .eq("user_id", userId)
                    .single();
                  
                  if (!dbError && data) {
                    // Проверяем тип транспорта
                    if (data.transport_type !== transportType) {
                      const transportNames: Record<string, string> = {
                        train: "поезд",
                        flight: "самолёт",
                        bus: "автобус"
                      };
                      const errorMsg = `Сертификат можно использовать только для покупки билетов на ${transportNames[data.transport_type] || data.transport_type}`;
                      setError(errorMsg);
                      onCertificateError?.(errorMsg);
                      onCertificateSelect(null);
                    } else if (data.status !== "active" || new Date(data.expires_at) < new Date()) {
                      setError("Сертификат недействителен или истёк");
                      onCertificateError?.("Сертификат недействителен или истёк");
                      onCertificateSelect(null);
                    } else {
                      onCertificateSelect(data);
                      setError(null);
                      onCertificateError?.(null);
                    }
                  } else {
                    setError("Сертификат не найден");
                    onCertificateError?.("Сертификат не найден");
                    onCertificateSelect(null);
                  }
                } catch (err) {
                  setError("Ошибка при проверке сертификата");
                  onCertificateError?.("Ошибка при проверке сертификата");
                  onCertificateSelect(null);
                }
              }
            } else {
              onCertificateSelect(null);
              setError(null);
              onCertificateError?.(null);
            }
          }}
          maxLength={10}
          className={cn("pr-10", error && "border-red-500")}
        />
        {error && (
          <p className="text-sm text-red-600 mt-1">{error}</p>
        )}
        {certificates.length > 0 && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(!open);
                }}
              >
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="end">
              <div className="p-2">
                <div className="text-sm font-medium mb-2 px-2">
                  Ваши сертификаты ({getTransportTypeLabel(transportType)})
                </div>
                {loading ? (
                  <div className="text-sm text-muted-foreground p-4 text-center">
                    Загрузка...
                  </div>
                ) : certificates.length === 0 ? (
                  <div className="text-sm text-muted-foreground p-4 text-center">
                    Нет доступных сертификатов
                  </div>
                ) : (
                  <div className="space-y-1 max-h-[300px] overflow-y-auto">
                    {certificates.map((cert) => (
                      <button
                        key={cert.id}
                        type="button"
                        className={cn(
                          "w-full text-left p-3 rounded-md border transition-colors",
                          "hover:bg-accent hover:text-accent-foreground",
                          value === cert.certificate_code && "bg-accent border-primary"
                        )}
                        onClick={() => handleCertificateClick(cert)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Gift className="h-4 w-4 text-primary" />
                              <span className="font-mono text-sm font-medium">
                                {cert.certificate_code}
                              </span>
                              {value === cert.certificate_code && (
                                <Check className="h-4 w-4 text-primary" />
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {cert.amount.toLocaleString("ru-RU")} ₽
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default CertificateInput;

