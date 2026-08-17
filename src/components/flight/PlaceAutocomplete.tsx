import { useEffect, useId, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import {
  fetchTravelpayoutsPlaces,
  formatPlaceLabel,
  type TravelpayoutsPlace,
} from "@/lib/travelpayouts";

export interface SelectedPlace {
  code: string;
  label: string;
  place: TravelpayoutsPlace;
}

interface PlaceAutocompleteProps {
  id?: string;
  placeholder?: string;
  value: SelectedPlace | null;
  onChange: (place: SelectedPlace | null) => void;
  error?: string;
  variant?: "hero" | "header";
  className?: string;
}

const PlaceAutocomplete = ({
  id,
  placeholder = "Город или аэропорт",
  value,
  onChange,
  error,
  variant = "header",
  className,
}: PlaceAutocompleteProps) => {
  const listId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState(value?.label ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const [places, setPlaces] = useState<TravelpayoutsPlace[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const debouncedTerm = useDebouncedValue(inputValue, 400);

  useEffect(() => {
    setInputValue(value?.label ?? "");
  }, [value?.label]);

  useEffect(() => {
    if (!isOpen || !debouncedTerm.trim()) {
      setPlaces([]);
      setHasSearched(false);
      setFetchError(null);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setFetchError(null);

    fetchTravelpayoutsPlaces(debouncedTerm, controller.signal)
      .then((results) => {
        setPlaces(results);
        setHasSearched(true);
      })
      .catch((err: Error) => {
        if (err.name === "AbortError") return;
        setFetchError("Не удалось загрузить подсказки");
        setPlaces([]);
        setHasSearched(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [debouncedTerm, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (next: string) => {
    setInputValue(next);
    setIsOpen(true);
    if (value && next !== value.label) {
      onChange(null);
    }
  };

  const handleSelect = (place: TravelpayoutsPlace) => {
    const selected: SelectedPlace = {
      code: place.code,
      label: formatPlaceLabel(place),
      place,
    };
    setInputValue(selected.label);
    onChange(selected);
    setIsOpen(false);
  };

  const showDropdown = isOpen && inputValue.trim().length > 0;
  const showEmpty = showDropdown && hasSearched && !isLoading && places.length === 0 && !fetchError;

  const inputClassName =
    variant === "hero"
      ? "h-11 bg-white/10 border-white/20 text-white placeholder:text-white/50 text-sm rounded-md focus-visible:ring-white/30"
      : "h-10 md:h-11 text-sm";

  return (
    <div ref={containerRef} className={cn("relative flex-1 min-w-0", className)}>
      <div className="relative">
        <Input
          id={id}
          type="text"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className={cn(inputClassName, error && "border-destructive focus-visible:ring-destructive")}
        />
        {isLoading && (
          <Loader2
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin",
              variant === "hero" ? "text-white/70" : "text-muted-foreground",
            )}
            aria-hidden
          />
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}

      {showDropdown && (
        <ul
          id={listId}
          role="listbox"
          className={cn(
            "absolute z-[100] mt-1 max-h-60 w-full overflow-auto rounded-md border shadow-lg",
            variant === "hero"
              ? "border-white/20 bg-[#1a1a2e]/95 text-white backdrop-blur-md"
              : "border-border bg-popover text-popover-foreground",
          )}
        >
          {fetchError && (
            <li className="px-3 py-2 text-sm text-red-400">{fetchError}</li>
          )}
          {showEmpty && (
            <li className="px-3 py-2 text-sm text-muted-foreground">Ничего не найдено</li>
          )}
          {places.map((place) => (
            <li key={place.id} role="option">
              <button
                type="button"
                className={cn(
                  "flex w-full flex-col items-start px-3 py-2 text-left text-sm transition-colors",
                  variant === "hero" ? "hover:bg-white/10" : "hover:bg-accent hover:text-accent-foreground",
                )}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(place)}
              >
                <span className="font-medium">{formatPlaceLabel(place)}</span>
                <span
                  className={cn(
                    "text-xs",
                    variant === "hero" ? "text-white/60" : "text-muted-foreground",
                  )}
                >
                  {place.country_name} · {place.code}
                  {place.type === "airport" ? " · Аэропорт" : " · Город"}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlaceAutocomplete;
