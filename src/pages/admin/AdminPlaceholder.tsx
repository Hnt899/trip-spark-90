import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = { title: string; description: string };

export default function AdminPlaceholder({ title, description }: Props) {
  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Раздел появится на следующих фазах (CMS контента).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
