import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { PassengerData } from "./PassengerForm";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface SavedPassenger {
  id: string;
  name: string;
  surname: string;
  patronymic?: string;
  gender?: string;
  birth_date: string;
  passport_series: string;
  passport_number: string;
  display_name?: string;
}

interface SelectPassengerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (passenger: PassengerData, displayName?: string) => void;
  userId: string;
}

const SelectPassengerModal = ({
  open,
  onClose,
  onSelect,
  userId,
}: SelectPassengerModalProps) => {
  const [passengers, setPassengers] = useState<SavedPassenger[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && userId) {
      loadPassengers();
    }
  }, [open, userId]);

  const loadPassengers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("passengers")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPassengers(data || []);
    } catch (error) {
      console.error("Error loading passengers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (passenger: SavedPassenger) => {
    const passengerData: PassengerData = {
      surname: (passenger.surname || "").toUpperCase(),
      name: (passenger.name || "").toUpperCase(),
      patronymic: (passenger.patronymic || "").toUpperCase(),
      noPatronymic: !passenger.patronymic,
      gender: passenger.gender || "",
      birthDate: passenger.birth_date,
      documentType: "passport", // По умолчанию паспорт
      documentSeries: passenger.passport_series,
      documentNumber: passenger.passport_number,
    };
    onSelect(passengerData, passenger.display_name || undefined);
    onClose();
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd.MM.yyyy", { locale: ru });
    } catch {
      return dateString;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Выберите пассажира</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {loading ? (
            <div className="text-center py-8">Загрузка...</div>
          ) : passengers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              У вас нет сохраненных пассажиров
            </div>
          ) : (
            passengers.map((passenger) => (
              <div
                key={passenger.id}
                className="border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                onClick={() => handleSelect(passenger)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">
                      {passenger.surname} {passenger.name}{" "}
                      {passenger.patronymic}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Дата рождения: {formatDate(passenger.birth_date)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Паспорт: {passenger.passport_series}{" "}
                      {passenger.passport_number}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Выбрать
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectPassengerModal;

