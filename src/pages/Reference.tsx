import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Search, Plane, Bus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { trainsArticles } from "@/data/referenceSearch";

const Reference = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Поиск по статьям
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase().trim();
    return trainsArticles.filter(article => {
      const titleMatch = article.title.toLowerCase().includes(query);
      const keywordsMatch = article.keywords.some(keyword => 
        keyword.toLowerCase().includes(query)
      );
      return titleMatch || keywordsMatch;
    });
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchResults.length > 0) {
      navigate(searchResults[0].path);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        {/* Search Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex-1 max-w-2xl relative">
              <Input
                type="text"
                placeholder="Поиск по разделу Справочная"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full h-12 text-base rounded-lg pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            </div>
            <Button 
              onClick={handleSearch}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-6 rounded-lg font-semibold"
            >
              TudaSuda!
            </Button>
          </div>
          <p className="text-sm text-muted-foreground ml-1">
            Например: Что такое электронная регистрация?
          </p>
          
          {/* Search Results Dropdown */}
          {searchQuery.trim() && searchResults.length > 0 && (
            <div className="mt-4 max-w-2xl bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
              {searchResults.map((article, index) => (
                <Link
                  key={index}
                  to={article.path}
                  className="block p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <div className="font-semibold text-primary mb-1">{article.title}</div>
                  <div className="text-sm text-muted-foreground">{article.category}</div>
                </Link>
              ))}
            </div>
          )}
          
          {searchQuery.trim() && searchResults.length === 0 && (
            <div className="mt-4 max-w-2xl bg-white border border-gray-200 rounded-lg shadow-lg p-4">
              <p className="text-muted-foreground">Ничего не найдено. Попробуйте другой запрос.</p>
            </div>
          )}
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

          <Link to="/reference/flights" className="block">
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-primary h-full">
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-sky-50 via-primary/5 to-sky-50 p-8 min-h-[320px] flex flex-col items-center justify-center">
                  <div className="mb-8 transform group-hover:scale-110 transition-transform duration-300 relative">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
                    <div className="relative">
                      <Plane className="text-primary" size={120} />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-primary underline decoration-primary decoration-2 underline-offset-4 group-hover:text-primary/80 transition-colors">
                    Самолёты
                  </h2>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/reference/buses" className="block">
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-primary h-full">
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-green-50 via-primary/5 to-green-50 p-8 min-h-[320px] flex flex-col items-center justify-center">
                  <div className="mb-8 transform group-hover:scale-110 transition-transform duration-300 relative">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
                    <div className="relative">
                      <Bus className="text-primary" size={120} />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-primary underline decoration-primary decoration-2 underline-offset-4 group-hover:text-primary/80 transition-colors">
                    Автобусы
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
