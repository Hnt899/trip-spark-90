import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PassengerData {
  surname: string;
  name: string;
  patronymic: string;
  noPatronymic: boolean;
  gender: string;
  birthDate: string;
  documentType: string;
  documentSeries: string;
  documentNumber: string;
}

interface PassengerFormProps {
  passengerNumber: number;
  passengerType: "adult" | "child" | "infant";
  data: PassengerData;
  onChange: (data: PassengerData) => void;
  errors?: Partial<Record<keyof PassengerData, string>>;
  onSelectFromSaved?: () => void;
  showSelectButton?: boolean;
  displayName?: string; // Имя для отображения из сохраненного пассажира
  duplicateError?: string; // Общая ошибка для карточки (например, дубликат)
}

const PassengerForm = ({
  passengerNumber,
  passengerType,
  data,
  onChange,
  errors = {},
  onSelectFromSaved,
  showSelectButton = false,
  displayName,
  duplicateError,
}: PassengerFormProps) => {
  const handleChange = (field: keyof PassengerData, value: string | boolean) => {
    onChange({
      ...data,
      [field]: value,
      ...(field === "noPatronymic" && value === true ? { patronymic: "" } : {}),
    });
  };

  const getPassengerTypeLabel = () => {
    switch (passengerType) {
      case "adult":
        return "Взрослый, старше 10 лет";
      case "child":
        return "Ребёнок до 10 лет с местом";
      case "infant":
        return "Малыш до 5 лет без места";
      default:
        return "";
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold">
              {displayName || `Пассажир ${passengerNumber}`}
            </h3>
            <p className="text-sm text-muted-foreground">{getPassengerTypeLabel()}</p>
          </div>
          {showSelectButton && onSelectFromSaved && (
            <Button
              type="button"
              variant="ghost"
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              onClick={onSelectFromSaved}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Выбрать
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {/* ФИО */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`surname-${passengerNumber}`}>Фамилия</Label>
              <Input
                id={`surname-${passengerNumber}`}
                value={data.surname}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  handleChange("surname", value);
                }}
                className={cn(errors.surname && !duplicateError && "border-red-500")}
                placeholder="Фамилия"
              />
              {errors.surname && !duplicateError && (
                <p className="text-sm text-red-500">{errors.surname}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor={`name-${passengerNumber}`}>Имя</Label>
              <Input
                id={`name-${passengerNumber}`}
                value={data.name}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  handleChange("name", value);
                }}
                className={cn(errors.name && "border-red-500")}
                placeholder="Имя"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`patronymic-${passengerNumber}`}>Отчество</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`noPatronymic-${passengerNumber}`}
                    checked={data.noPatronymic}
                    onCheckedChange={(checked) => handleChange("noPatronymic", checked === true)}
                  />
                  <Label
                    htmlFor={`noPatronymic-${passengerNumber}`}
                    className="text-sm font-normal cursor-pointer whitespace-nowrap"
                  >
                    Нет отчества
                  </Label>
                </div>
              </div>
              <Input
                id={`patronymic-${passengerNumber}`}
                value={data.patronymic}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  handleChange("patronymic", value);
                }}
                disabled={data.noPatronymic}
                className={cn(
                  errors.patronymic && "border-red-500",
                  data.noPatronymic && "opacity-50"
                )}
                placeholder="Отчество"
              />
              {errors.patronymic && !data.noPatronymic && (
                <p className="text-sm text-red-500">{errors.patronymic}</p>
              )}
            </div>
          </div>

          {/* Пол, Дата рождения, Документ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`gender-${passengerNumber}`}>Пол</Label>
              <Select
                value={data.gender}
                onValueChange={(value) => handleChange("gender", value)}
              >
                <SelectTrigger
                  id={`gender-${passengerNumber}`}
                  className={cn(errors.gender && "border-red-500")}
                >
                  <SelectValue placeholder="Выберите пол" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Мужской</SelectItem>
                  <SelectItem value="female">Женский</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-red-500">{errors.gender}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor={`birthDate-${passengerNumber}`}>Дата рождения</Label>
              <Input
                id={`birthDate-${passengerNumber}`}
                type="date"
                value={data.birthDate}
                onChange={(e) => handleChange("birthDate", e.target.value)}
                className={cn(errors.birthDate && "border-red-500")}
              />
              {errors.birthDate && (
                <p className="text-sm text-red-500">{errors.birthDate}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor={`documentType-${passengerNumber}`}>Документ</Label>
              <Select
                value={data.documentType}
                onValueChange={(value) => handleChange("documentType", value)}
              >
                <SelectTrigger
                  id={`documentType-${passengerNumber}`}
                  className={cn(errors.documentType && "border-red-500")}
                >
                  <SelectValue placeholder="Выберите документ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passport">Паспорт РФ</SelectItem>
                  <SelectItem value="birth_certificate">Свидетельство о рождении</SelectItem>
                  <SelectItem value="foreign_passport">Заграничный паспорт</SelectItem>
                  <SelectItem value="foreign_document">Иностранный документ</SelectItem>
                </SelectContent>
              </Select>
              {errors.documentType && (
                <p className="text-sm text-red-500">{errors.documentType}</p>
              )}
            </div>
          </div>

          {/* Серия и номер документа */}
          <div className="space-y-2">
            <Label htmlFor={`documentSeries-${passengerNumber}`}>Серия и номер</Label>
            <Input
              id={`documentSeries-${passengerNumber}`}
              value={data.documentSeries && data.documentNumber 
                ? `${data.documentSeries} ${data.documentNumber}`.trim()
                : ""}
              onChange={(e) => {
                const value = e.target.value.replace(/\s/g, "");
                const series = value.slice(0, 4);
                const number = value.slice(4, 14);
                onChange({
                  ...data,
                  documentSeries: series,
                  documentNumber: number,
                });
              }}
              className={cn(errors.documentSeries || errors.documentNumber ? "border-red-500" : "")}
              placeholder="6021 210819"
              maxLength={18}
            />
            {(errors.documentSeries || errors.documentNumber) && (
              <p className="text-sm text-red-500">
                {errors.documentSeries || errors.documentNumber}
              </p>
            )}
            {duplicateError && (
              <p className="text-sm text-red-500 mt-2">
                {duplicateError}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PassengerForm;

