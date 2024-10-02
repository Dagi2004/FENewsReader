import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Searchbar from "./Serachbar";

const NewsCard = ({ category, isDarkMode }) => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines`,
          {
            params: {
              country: "us",
              category: category,
              apiKey: "b7e1e9b2f5f64b149484c0997f1bb715",
            },
          }
        );
        setArticles(response.data.articles);
        console.log(articles);
      } catch (error) {
        console.error("Error fetching the news articles:", error);
      }
    };
    fetchArticles();
  }, [category]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`p-8 shadow-lg ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-around ">
        <h2
          className={`text-1xl md:3xl font-extrabold mb-6 text-center capitalize ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {category} News
        </h2>

        <Searchbar searchTerm={searchTerm} onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.slice(0, 8).map((article, id) => (
            <Link key={id} to={article.url} target="_blank">
              <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-lg transition-shadow">
                {article.urlToImage ? (
                  <img
                    src={article.urlToImage}
                    alt="Article"
                    className="w-full h-52 object-cover rounded-t-lg"
                  />
                ) : (
                  <img
                    src="news2.jpeg"
                    alt="Fallback"
                    className="h-56 w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-md font-semibold text-blue-600 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{article.description}</p>
                  <p className="text-sm text-gray-400 mb-4">
                    {new Date(article.publishedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="flex justify-center items-center text-red-400 mt-4">
            No articles found.
          </p>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
