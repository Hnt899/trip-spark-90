import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Reference = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        {/* Search Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <Input
              type="text"
              placeholder="Поиск по разделу Справочная"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 max-w-2xl h-12 text-base rounded-lg"
            />
            <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-6 rounded-lg font-semibold">
              TudaSuda!
            </Button>
          </div>
          <p className="text-sm text-muted-foreground ml-1">
            Например: Что такое электронная регистрация?
          </p>
        </div>

        {/* Breadcrumb */}
        <p className="text-sm text-muted-foreground mb-8">Справочная</p>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-12">
          Справочная
        </h1>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl">
          <Link to="/reference/trains" className="block">
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-primary h-full">
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-blue-50 via-primary/5 to-blue-50 p-8 min-h-[320px] flex flex-col items-center justify-center">
                  <div className="mb-8 transform group-hover:scale-110 transition-transform duration-300 relative">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
                    <div className="relative">
                      <svg
                        width="120"
                        height="120"
                        viewBox="0 0 120 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-primary"
                      >
                        {/* Паровоз */}
                        <path
                          d="M20 80 L100 80 L100 70 L90 70 L90 50 L100 50 L100 40 L20 40 Z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <rect x="25" y="45" width="60" height="25" fill="currentColor" opacity="0.9" />
                        <circle cx="35" cy="80" r="12" fill="#1a1a1a" />
                        <circle cx="35" cy="80" r="8" fill="currentColor" opacity="0.3" />
                        <circle cx="85" cy="80" r="12" fill="#1a1a1a" />
                        <circle cx="85" cy="80" r="8" fill="currentColor" opacity="0.3" />
                        <rect x="30" y="35" width="20" height="15" fill="currentColor" />
                        <path
                          d="M30 35 L40 25 L50 35 Z"
                          fill="currentColor"
                        />
                        <path
                          d="M25 40 L30 35 L30 50 L25 50 Z"
                          fill="currentColor"
                        />
                        <path
                          d="M50 40 L55 35 L60 45 L55 50 Z"
                          fill="currentColor"
                        />
                        <circle cx="40" cy="32" r="2" fill="#FFD700" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-primary underline decoration-primary decoration-2 underline-offset-4 group-hover:text-primary/80 transition-colors">
                    Поезда
                  </h2>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reference;
