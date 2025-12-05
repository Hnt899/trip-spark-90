import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface BuyerData {
  surname: string;
  name: string;
  email: string;
  phone: string;
}

interface BuyerFormProps {
  data: BuyerData;
  onChange: (data: BuyerData) => void;
  errors?: Partial<Record<keyof BuyerData, string>>;
  userData?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  onUseAccountData?: () => void;
}

const BuyerForm = ({
  data,
  onChange,
  errors = {},
  userData,
  onUseAccountData,
}: BuyerFormProps) => {
  const handleChange = (field: keyof BuyerData, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const hasAccountData = userData && (userData.firstName || userData.lastName);
  const displayName = data.name && data.surname 
    ? `${data.name} ${data.surname[0]}.`
    : hasAccountData 
      ? `${userData.firstName} ${userData.lastName?.[0]}.`
      : "";

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold">Покупатель</h3>
            <p className="text-sm text-muted-foreground">
              Отправим билет, сообщим об изменениях
            </p>
          </div>
          {displayName && (
            <Badge
              className={cn(
                "cursor-pointer bg-blue-900 text-white hover:bg-blue-800 px-3 py-1",
                hasAccountData && onUseAccountData && "hover:bg-blue-700"
              )}
              onClick={hasAccountData && onUseAccountData ? onUseAccountData : undefined}
            >
              {displayName.toUpperCase()}
            </Badge>
          )}
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="buyer-surname">Фамилия</Label>
              <Input
                id="buyer-surname"
                value={data.surname}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  handleChange("surname", value);
                }}
                className={cn(errors.surname && "border-red-500")}
                placeholder="Фамилия"
              />
              {errors.surname && (
                <p className="text-sm text-red-500">{errors.surname}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="buyer-name">Имя</Label>
              <Input
                id="buyer-name"
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 relative">
              <Label htmlFor="buyer-email">Электронная почта</Label>
              <Input
                id="buyer-email"
                type="email"
                value={data.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={cn(errors.email && "border-yellow-400 bg-yellow-50 border-2")}
                placeholder="name@site.ru"
              />
              {errors.email && (
                <div className="absolute -top-12 left-0 z-20">
                  <div className="relative bg-blue-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg">
                    <div className="absolute -bottom-1 left-6 w-3 h-3 bg-blue-900 rotate-45"></div>
                    {errors.email}
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="buyer-phone">Телефон</Label>
              <Input
                id="buyer-phone"
                type="tel"
                value={data.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  let formatted = "";
                  if (value.length > 0) {
                    formatted = "+7";
                    if (value.length > 1) {
                      formatted += " " + value.slice(1, 4);
                    }
                    if (value.length > 4) {
                      formatted += " " + value.slice(4, 7);
                    }
                    if (value.length > 7) {
                      formatted += "-" + value.slice(7, 9);
                    }
                    if (value.length > 9) {
                      formatted += "-" + value.slice(9, 11);
                    }
                  }
                  handleChange("phone", formatted);
                }}
                className={cn(errors.phone && "border-red-500")}
                placeholder="+7 952 560-23-63"
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuyerForm;

