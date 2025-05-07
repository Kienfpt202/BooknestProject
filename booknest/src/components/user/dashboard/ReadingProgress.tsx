"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const progress = {
  begin: 18,
  reading: 10,
  finished: 35,
};

const data = {
  labels: ["Begin", "Reading", "Finished"],
  datasets: [
    {
      data: [progress.begin, progress.reading, progress.finished],
      backgroundColor: ["#487AA1", "#E74C3C", "#27AE60"],
      hoverBackgroundColor: ["#3A678A", "#C0392B", "#229954"],
    },
  ],
};

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

const ReadingProgress = () => {
  return (
    <div className="bg-[#E5E5E5] p-4 rounded-xl shadow-md w-full">
      <h2 className="text-lg font-semibold text-[#704214] mb-2">Reading Progress</h2>
      <Doughnut data={data} options={options} />
      <button className="text-[#487AA1] mt-3 text-sm">More...</button>
    </div>
  );
};

export default ReadingProgress;
