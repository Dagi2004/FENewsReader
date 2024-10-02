import React from "react";
import NewsCard from "./NewsCard";

const NewsList = ({ articles }) => (
  <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
    {articles.map((article) => (
      <NewsCard key={article.url} article={article} />
    ))}
  </div>
);

export default NewsList;
