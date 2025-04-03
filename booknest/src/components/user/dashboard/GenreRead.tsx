"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Đăng ký các thành phần biểu đồ
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const genres = [
  { name: "Article", started: 20, reading: 15, finished: 30 },
  { name: "Psychology", started: 10, reading: 5, finished: 25 },
  { name: "Journal", started: 18, reading: 8, finished: 22 },
  { name: "Finance", started: 12, reading: 6, finished: 20 },
  { name: "Study", started: 25, reading: 10, finished: 35 },
  { name: "Literature", started: 22, reading: 12, finished: 28 },
  { name: "Funny", started: 15, reading: 9, finished: 18 },
];

// Dữ liệu cho biểu đồ
const data = {
  labels: genres.map((genre) => genre.name),
  datasets: [
    {
      label: "Begin",
      data: genres.map((genre) => genre.started),
      backgroundColor: "#487AA1",
    },
    {
      label: "Reading",
      data: genres.map((genre) => genre.reading),
      backgroundColor: "#E74C3C",
    },
    {
      label: "Finished",
      data: genres.map((genre) => genre.finished),
      backgroundColor: "#27AE60",
    },
  ],
};

// Cấu hình biểu đồ
const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const }, // Sửa lỗi tại đây
      title: { display: true, text: "Genre Read Statistics" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

const GenreRead = () => {
  return (
    <div className="bg-[#E5E5E5] p-4 rounded-xl shadow-md w-full">
      <h2 className="text-lg font-semibold text-[#704214] mb-2">Genre Read</h2>
      <Bar data={data} options={options} />
      <button className="text-[#487AA1] mt-3 text-sm">More...</button>
    </div>
  );
};

export default GenreRead;
