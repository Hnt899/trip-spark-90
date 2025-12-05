import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Shield, Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface AdditionalServicesData {
  insurance: "yes" | "no" | "";
  refund: "yes" | "no" | "";
}

interface AdditionalServicesProps {
  data: AdditionalServicesData;
  onChange: (data: AdditionalServicesData) => void;
  totalPassengers: number;
}

const AdditionalServices = ({
  data,
  onChange,
  totalPassengers,
}: AdditionalServicesProps) => {
  const [insuranceModalOpen, setInsuranceModalOpen] = useState(false);
  const [refundModalOpen, setRefundModalOpen] = useState(false);

  const handleInsuranceChange = (value: string) => {
    onChange({
      ...data,
      insurance: value as "yes" | "no",
    });
  };

  const handleRefundChange = (value: string) => {
    onChange({
      ...data,
      refund: value as "yes" | "no",
    });
  };

  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/Offer_tutu_railway_ns_2.pdf";
    link.download = "Offer_tutu_railway_ns_2.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 mb-8">
      <h2 className="text-2xl font-bold">Добавьте спокойствия и комфорта</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Страхование */}
        <Card className="h-full flex flex-col">
          <CardContent className="p-6 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-bold">Страхование на время поездки</h3>
            </div>

            <RadioGroup
              value={data.insurance || ""}
              onValueChange={handleInsuranceChange}
              className="space-y-4"
            >
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="yes" id="insurance-yes" className="mt-1" />
                <div className="flex-1">
                  <Label
                    htmlFor="insurance-yes"
                    className="cursor-pointer font-normal"
                  >
                    <div className="font-medium">
                      Застраховать жизнь и здоровье от несчастных случаев на время
                      поездки (страховая сумма 2750000₽)
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      299 ₽ за всех
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      Если на вокзале или в поезде возникнут проблемы со здоровьем,
                      вы получите деньги за каждый день лечения
                    </div>
                  </Label>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="no" id="insurance-no" />
                <div className="flex-1">
                  <Label
                    htmlFor="insurance-no"
                    className="cursor-pointer font-normal"
                  >
                    Нет, спасибо
                  </Label>
                </div>
              </div>
            </RadioGroup>

            <div className="mt-4 pt-4 border-t flex items-center justify-between mt-auto">
              <button
                onClick={() => setInsuranceModalOpen(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                Условия
              </button>
              <div className="text-sm font-semibold text-red-600">
                АЛЬФА СТРАХОВАНИЕ
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 100% возврат */}
        <Card className="h-full flex flex-col">
          <CardContent className="p-6 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-bold">
                100% возврат билета по любой причине
              </h3>
            </div>

            <RadioGroup
              value={data.refund || ""}
              onValueChange={handleRefundChange}
              className="space-y-4"
            >
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="yes" id="refund-yes" className="mt-1" />
                <div className="flex-1">
                  <Label
                    htmlFor="refund-yes"
                    className="cursor-pointer font-normal"
                  >
                    <div className="font-medium">
                      Полная стоимость заказа при возврате
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      550 ₽ за всех
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      Вернуть билет можно не позднее 1 часа до отправления
                    </div>
                  </Label>
                </div>
              </div>
              <div className="flex items-center space-x-3 mt-[4.5rem]">
                <RadioGroupItem value="no" id="refund-no" />
                <div className="flex-1">
                  <Label
                    htmlFor="refund-no"
                    className="cursor-pointer font-normal"
                  >
                    Без 100% возврата билета
                  </Label>
                </div>
              </div>
            </RadioGroup>

            <div className="mt-4 pt-4 border-t flex items-center justify-between mt-auto">
              <button
                onClick={() => setRefundModalOpen(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                Подробнее
              </button>
              <div className="text-sm font-semibold text-purple-600">tudasuda</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Модалка для страхования */}
      <Dialog open={insuranceModalOpen} onOpenChange={setInsuranceModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Страхование жизни и здоровья</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <p>
              Страховка действует в поезде, а также на вокзалах отправления и прибытия. 
              Она пригодится если произойдёт несчастный случай, из-за которого вы не сможете работать, 
              или последуют более тяжелые последствия.
            </p>
            <button
              onClick={handleDownloadPDF}
              className="text-purple-600 hover:underline"
            >
              Про страхование и выплаты
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Модалка для 100% возврата */}
      <Dialog open={refundModalOpen} onOpenChange={setRefundModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>100% возврат билета по любой причине</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <p>
              Обычно при возврате из стоимости жд билета вычитаются штрафы и сборы, предусмотренные условиями жд компании. 
              Сумма зависит от конкретного тарифа, направления, срока возвратов и пр.
            </p>
            <p>
              Чтобы не потерять деньги, перед покупкой билета оформите услугу 100% возврата. 
              На счёт вернётся полная стоимость заказа, за исключением стоимости услуги 100% возврата.
            </p>
            <p>
              Билет можно вернуть по любой причине, если до отправления осталось больше 1 часов. 
              Подтверждающие документы не нужны.
            </p>
            <p>
              Если вы обменяете билет, а затем вернёте, вы получите стоимость первого билета. 
              Например, если вы купите билет за 8 000 руб., обменяете на билет за 10 000 руб., 
              а потом сдадите, вам вернётся 8 000 руб.
            </p>
            <p>
              Услугу можно добавить к заказу только до покупки билетов и нельзя вернуть.
            </p>
            <p>
              Промокод и услуга «100% возврат» не применяются вместе.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <div className="text-sm text-muted-foreground space-y-1">
        <Link to="/reference/privacy" className="text-blue-600 hover:underline">
          Политика обработки персональных данных
        </Link>
        {" • "}
        <Link to="/reference/legal" className="text-blue-600 hover:underline">
          Правовая информация
        </Link>
        {" • "}
        <Link to="/reference/providers" className="text-blue-600 hover:underline">
          О поставщиках услуг
        </Link>
      </div>
    </div>
  );
};

export default AdditionalServices;

