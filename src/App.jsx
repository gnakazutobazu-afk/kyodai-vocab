import { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FilterBar from "./components/FilterBar";
import WordCard from "./components/WordCard";
import Footer from "./components/Footer";

export default function App() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openWord, setOpenWord] = useState(null);

  useEffect(() => {
    fetch("/data/words.json")
      .then((res) => {
        if (!res.ok) throw new Error("データの読み込みに失敗しました");
        return res.json();
      })
      .then((data) => {
        setWords(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredWords = useMemo(() => {
    return words.filter((w) => {
      if (selectedThemes.length > 0 && !selectedThemes.includes(w.theme_tag))
        return false;
      if (selectedLevel && w.level !== selectedLevel) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !w.word.toLowerCase().includes(q) &&
          !w.meaning_ja.includes(searchQuery)
        )
          return false;
      }
      return true;
    });
  }, [words, selectedThemes, selectedLevel, searchQuery]);

  function handleThemeToggle(key) {
    if (key === null) {
      setSelectedThemes([]);
      return;
    }
    setSelectedThemes((prev) =>
      prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]
    );
  }

  function handleCardToggle(wordKey) {
    setOpenWord((prev) => (prev === wordKey ? null : wordKey));
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="font-noto-sans text-muted text-lg animate-pulse">読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="font-noto-sans text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header totalCount={words.length} />
      <Hero />
      <FilterBar
        selectedThemes={selectedThemes}
        onThemeToggle={handleThemeToggle}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filteredCount={filteredWords.length}
        totalCount={words.length}
      />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        {filteredWords.length === 0 ? (
          <div className="text-center py-20 text-muted font-noto-sans">
            <p className="text-lg">該当する単語が見つかりませんでした。</p>
            <p className="text-sm mt-2">フィルタや検索条件を変更してください。</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {filteredWords.map((word) => (
              <WordCard
                key={word.word}
                word={word}
                isOpen={openWord === word.word}
                onToggle={() => handleCardToggle(word.word)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
