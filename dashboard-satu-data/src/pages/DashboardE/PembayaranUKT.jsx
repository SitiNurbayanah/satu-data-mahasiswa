import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PembayaranUKT = ({ onLogout }) => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedFakultas, setSelectedFakultas] = useState("Semua");
  const [selectedJurusan, setSelectedJurusan] = useState("Semua");

  const fakultasOptions = [
    "Semua",
    "Tarbiyah dan Keguruan",
    "Psikologi",
    "FST",
    "Ushuluddin",
    "Syariah dan Hukum",
    "Dakwah dan Komunikasi",
    "Adab dan Humaniora",
    "Ilmu Sosial dan Ilmu Politik",
    "Ekonomi dan Bisnis Islam",
  ];

  const jurusanByFakultas = {
    Semua: ["Semua"],
    "Tarbiyah dan Keguruan": [
      "Semua",
      "Manajemen Pendidikan Islam",
      "Pendidikan Agama Islam",
      "Pendidikan Bahasa Arab",
      "Pendidikan Bahasa Inggris",
      "Pendidikan Matematika",
      "Pendidikan Biologi",
      "Pendidikan Kimia",
      "Pendidikan Fisika",
      "Pendidikan Guru Madrasah Ibtidaiyah",
      "Pendidikan Islam Anak Usia Dini",
    ],
    Psikologi: ["Semua", "Psikologi"],
    FST: [
      "Semua",
      "Matematika",
      "Biologi",
      "Fisika",
      "Kimia",
      "Teknik Informatika",
      "Agroteknologi",
      "Teknik Elektro",
    ],
    Ushuluddin: [
      "Semua",
      "Ilmu al-Qur'an dan Tafsir/Tafsir Hadits",
      "Aqidah dan Filsafat Islam",
      "Studi Agama-Agama",
      "Tasawuf Psikoterapi",
      "Ilmu Hadits",
    ],
    "Syariah dan Hukum": [
      "Semua",
      "Hukum Keluarga (Ahwal Al-Syakhsiyyah)",
      "Hukum Ekonomi Syariah (Muamalah)",
      "Hukum Tata Negara (Siyasah)",
      "Perbandingan Madzhab",
      "Ilmu Hukum",
      "Hukum Pidana Islam (Jinayah)",
    ],
    "Dakwah dan Komunikasi": [
      "Semua",
      "Ilmu Komunikasi",
      "Komunikasi Penyiaran Islam",
      "Bimbingan dan Konseling Islam",
      "Manajemen Dakwah",
      "Pengembangan Masyarakat Islam",
    ],
    "Adab dan Humaniora": [
      "Semua",
      "Sejarah Peradaban Islam",
      "Bahasa dan Sastra Arab",
      "Sastra Inggris",
    ],
    "Ilmu Sosial dan Ilmu Politik": [
      "Semua",
      "Administrasi Publik",
      "Sosiologi",
      "Ilmu Politik",
    ],
    "Ekonomi dan Bisnis Islam": [
      "Semua",
      "Akutansi Syariah",
      "Ekonomi Syariah",
      "Manajemen",
      "Manajemen Keuangan Syariah",
    ],
  };

  // Comprehensive data for all faculties and years
  const chartDataByFakultas = {
    Semua: {
      2024: [
        { name: "Akutansi Syariah", value: 96 },
        { name: "Teknik Informatika", value: 95 },
        { name: "Pendidikan Agama Islam", value: 94 },
        { name: "Manajemen", value: 94 },
        { name: "PGMI", value: 93 },
        { name: "Psikologi", value: 93 },
        { name: "Ekonomi Syariah", value: 93 },
        { name: "Matematika", value: 92 },
        { name: "Manajemen Pendidikan Islam", value: 92 },
        { name: "Ilmu Komunikasi", value: 92 },
        { name: "Pendidikan Bahasa Inggris", value: 91 },
        { name: "Hukum Ekonomi Syariah", value: 91 },
        { name: "Manajemen Keuangan Syariah", value: 91 },
        { name: "PIAUD", value: 90 },
        { name: "Ilmu Hukum", value: 90 },
        { name: "Pendidikan Matematika", value: 89 },
        { name: "Teknik Elektro", value: 89 },
        { name: "Ilmu al-Qur'an dan Tafsir", value: 89 },
        { name: "Komunikasi Penyiaran Islam", value: 89 },
        { name: "Agroteknologi", value: 88 },
        { name: "Hukum Keluarga", value: 88 },
        { name: "Administrasi Publik", value: 88 },
        { name: "Pendidikan Biologi", value: 87 },
        { name: "Biologi", value: 87 },
        { name: "Aqidah dan Filsafat Islam", value: 87 },
        { name: "Bimbingan dan Konseling Islam", value: 87 },
        { name: "Kimia", value: 86 },
        { name: "Hukum Tata Negara", value: 86 },
        { name: "Sejarah Peradaban Islam", value: 86 },
        { name: "Pendidikan Bahasa Arab", value: 85 },
        { name: "Studi Agama-Agama", value: 85 },
        { name: "Manajemen Dakwah", value: 85 },
        { name: "Sosiologi", value: 85 },
        { name: "Fisika", value: 84 },
        { name: "Perbandingan Madzhab", value: 84 },
        { name: "Tasawuf Psikoterapi", value: 84 },
        { name: "Bahasa dan Sastra Arab", value: 84 },
        { name: "Pendidikan Kimia", value: 83 },
        { name: "Hukum Pidana Islam", value: 83 },
        { name: "Pengembangan Masyarakat Islam", value: 83 },
        { name: "Ilmu Politik", value: 83 },
        { name: "Ilmu Hadits", value: 82 },
        { name: "Sastra Inggris", value: 82 },
        { name: "Pendidikan Fisika", value: 81 },
      ],
      2023: [
        { name: "Akutansi Syariah", value: 93 },
        { name: "Teknik Informatika", value: 93 },
        { name: "Pendidikan Agama Islam", value: 91 },
        { name: "Manajemen", value: 91 },
        { name: "PGMI", value: 90 },
        { name: "Psikologi", value: 90 },
        { name: "Ekonomi Syariah", value: 90 },
        { name: "Matematika", value: 89 },
        { name: "Manajemen Pendidikan Islam", value: 89 },
        { name: "Ilmu Komunikasi", value: 89 },
        { name: "Pendidikan Bahasa Inggris", value: 88 },
        { name: "Hukum Ekonomi Syariah", value: 88 },
        { name: "Manajemen Keuangan Syariah", value: 88 },
        { name: "PIAUD", value: 87 },
        { name: "Ilmu Hukum", value: 87 },
        { name: "Teknik Elektro", value: 87 },
        { name: "Pendidikan Matematika", value: 86 },
        { name: "Agroteknologi", value: 86 },
        { name: "Ilmu al-Qur'an dan Tafsir", value: 86 },
        { name: "Komunikasi Penyiaran Islam", value: 86 },
        { name: "Hukum Keluarga", value: 85 },
        { name: "Administrasi Publik", value: 85 },
        { name: "Pendidikan Biologi", value: 84 },
        { name: "Biologi", value: 84 },
        { name: "Aqidah dan Filsafat Islam", value: 84 },
        { name: "Bimbingan dan Konseling Islam", value: 84 },
        { name: "Kimia", value: 83 },
        { name: "Hukum Tata Negara", value: 83 },
        { name: "Sejarah Peradaban Islam", value: 83 },
        { name: "Pendidikan Bahasa Arab", value: 82 },
        { name: "Studi Agama-Agama", value: 82 },
        { name: "Manajemen Dakwah", value: 82 },
        { name: "Sosiologi", value: 82 },
        { name: "Fisika", value: 81 },
        { name: "Perbandingan Madzhab", value: 81 },
        { name: "Tasawuf Psikoterapi", value: 81 },
        { name: "Bahasa dan Sastra Arab", value: 81 },
        { name: "Pendidikan Kimia", value: 80 },
        { name: "Hukum Pidana Islam", value: 80 },
        { name: "Pengembangan Masyarakat Islam", value: 80 },
        { name: "Ilmu Politik", value: 80 },
        { name: "Ilmu Hadits", value: 79 },
        { name: "Sastra Inggris", value: 79 },
        { name: "Pendidikan Fisika", value: 78 },
      ],
      2022: [
        { name: "Akutansi Syariah", value: 90 },
        { name: "Teknik Informatika", value: 90 },
        { name: "Teknik Elektro", value: 89 },
        { name: "Pendidikan Agama Islam", value: 88 },
        { name: "Manajemen", value: 88 },
        { name: "PGMI", value: 87 },
        { name: "Psikologi", value: 87 },
        { name: "Ekonomi Syariah", value: 87 },
        { name: "Agroteknologi", value: 87 },
        { name: "Matematika", value: 86 },
        { name: "Manajemen Pendidikan Islam", value: 86 },
        { name: "Ilmu Komunikasi", value: 86 },
        { name: "Pendidikan Bahasa Inggris", value: 85 },
        { name: "Hukum Ekonomi Syariah", value: 85 },
        { name: "Manajemen Keuangan Syariah", value: 85 },
        { name: "Biologi", value: 85 },
        { name: "PIAUD", value: 84 },
        { name: "Ilmu Hukum", value: 84 },
        { name: "Pendidikan Matematika", value: 83 },
        { name: "Ilmu al-Qur'an dan Tafsir", value: 83 },
        { name: "Komunikasi Penyiaran Islam", value: 83 },
        { name: "Hukum Keluarga", value: 82 },
        { name: "Administrasi Publik", value: 82 },
        { name: "Pendidikan Biologi", value: 81 },
        { name: "Aqidah dan Filsafat Islam", value: 81 },
        { name: "Bimbingan dan Konseling Islam", value: 81 },
        { name: "Kimia", value: 80 },
        { name: "Hukum Tata Negara", value: 80 },
        { name: "Sejarah Peradaban Islam", value: 80 },
        { name: "Pendidikan Bahasa Arab", value: 79 },
        { name: "Studi Agama-Agama", value: 79 },
        { name: "Manajemen Dakwah", value: 79 },
        { name: "Sosiologi", value: 79 },
        { name: "Fisika", value: 78 },
        { name: "Perbandingan Madzhab", value: 78 },
        { name: "Tasawuf Psikoterapi", value: 78 },
        { name: "Bahasa dan Sastra Arab", value: 78 },
        { name: "Pendidikan Kimia", value: 77 },
        { name: "Hukum Pidana Islam", value: 77 },
        { name: "Pengembangan Masyarakat Islam", value: 77 },
        { name: "Ilmu Politik", value: 77 },
        { name: "Ilmu Hadits", value: 76 },
        { name: "Sastra Inggris", value: 76 },
        { name: "Pendidikan Fisika", value: 75 },
      ],
    },
    FST: {
      2024: [
        { name: "Teknik Informatika", value: 95 },
        { name: "Matematika", value: 92 },
        { name: "Teknik Elektro", value: 89 },
        { name: "Agroteknologi", value: 88 },
        { name: "Biologi", value: 87 },
        { name: "Kimia", value: 86 },
        { name: "Fisika", value: 84 },
      ],
      2023: [
        { name: "Teknik Informatika", value: 93 },
        { name: "Matematika", value: 89 },
        { name: "Teknik Elektro", value: 87 },
        { name: "Agroteknologi", value: 86 },
        { name: "Biologi", value: 84 },
        { name: "Kimia", value: 83 },
        { name: "Fisika", value: 81 },
      ],
      2022: [
        { name: "Teknik Informatika", value: 90 },
        { name: "Teknik Elektro", value: 89 },
        { name: "Agroteknologi", value: 87 },
        { name: "Matematika", value: 86 },
        { name: "Biologi", value: 85 },
        { name: "Kimia", value: 80 },
        { name: "Fisika", value: 78 },
      ],
    },
    "Tarbiyah dan Keguruan": {
      2024: [
        { name: "Pendidikan Agama Islam", value: 94 },
        { name: "PGMI", value: 93 },
        { name: "Manajemen Pendidikan Islam", value: 92 },
        { name: "Pendidikan Bahasa Inggris", value: 91 },
        { name: "PIAUD", value: 90 },
        { name: "Pendidikan Matematika", value: 89 },
        { name: "Pendidikan Biologi", value: 87 },
        { name: "Pendidikan Bahasa Arab", value: 85 },
        { name: "Pendidikan Kimia", value: 83 },
        { name: "Pendidikan Fisika", value: 81 },
      ],
      2023: [
        { name: "Pendidikan Agama Islam", value: 91 },
        { name: "PGMI", value: 90 },
        { name: "Manajemen Pendidikan Islam", value: 89 },
        { name: "Pendidikan Bahasa Inggris", value: 88 },
        { name: "PIAUD", value: 87 },
        { name: "Pendidikan Matematika", value: 86 },
        { name: "Pendidikan Biologi", value: 84 },
        { name: "Pendidikan Bahasa Arab", value: 82 },
        { name: "Pendidikan Kimia", value: 80 },
        { name: "Pendidikan Fisika", value: 78 },
      ],
      2022: [
        { name: "Pendidikan Agama Islam", value: 88 },
        { name: "PGMI", value: 87 },
        { name: "Manajemen Pendidikan Islam", value: 86 },
        { name: "Pendidikan Bahasa Inggris", value: 85 },
        { name: "PIAUD", value: 84 },
        { name: "Pendidikan Matematika", value: 83 },
        { name: "Pendidikan Biologi", value: 81 },
        { name: "Pendidikan Bahasa Arab", value: 79 },
        { name: "Pendidikan Kimia", value: 77 },
        { name: "Pendidikan Fisika", value: 75 },
      ],
    },
    "Ekonomi dan Bisnis Islam": {
      2024: [
        { name: "Akutansi Syariah", value: 96 },
        { name: "Manajemen", value: 94 },
        { name: "Ekonomi Syariah", value: 93 },
        { name: "Manajemen Keuangan Syariah", value: 91 },
      ],
      2023: [
        { name: "Akutansi Syariah", value: 93 },
        { name: "Manajemen", value: 91 },
        { name: "Ekonomi Syariah", value: 90 },
        { name: "Manajemen Keuangan Syariah", value: 88 },
      ],
      2022: [
        { name: "Akutansi Syariah", value: 90 },
        { name: "Manajemen", value: 88 },
        { name: "Ekonomi Syariah", value: 87 },
        { name: "Manajemen Keuangan Syariah", value: 85 },
      ],
    },
    Psikologi: {
      2024: [{ name: "Psikologi", value: 93 }],
      2023: [{ name: "Psikologi", value: 90 }],
      2022: [{ name: "Psikologi", value: 87 }],
    },
    Ushuluddin: {
      2024: [
        { name: "Ilmu al-Qur'an dan Tafsir", value: 89 },
        { name: "Aqidah dan Filsafat Islam", value: 87 },
        { name: "Studi Agama-Agama", value: 85 },
        { name: "Tasawuf Psikoterapi", value: 84 },
        { name: "Ilmu Hadits", value: 82 },
      ],
      2023: [
        { name: "Ilmu al-Qur'an dan Tafsir", value: 86 },
        { name: "Aqidah dan Filsafat Islam", value: 84 },
        { name: "Studi Agama-Agama", value: 82 },
        { name: "Tasawuf Psikoterapi", value: 81 },
        { name: "Ilmu Hadits", value: 79 },
      ],
      2022: [
        { name: "Ilmu al-Qur'an dan Tafsir", value: 83 },
        { name: "Aqidah dan Filsafat Islam", value: 81 },
        { name: "Studi Agama-Agama", value: 79 },
        { name: "Tasawuf Psikoterapi", value: 78 },
        { name: "Ilmu Hadits", value: 76 },
      ],
    },
    "Syariah dan Hukum": {
      2024: [
        { name: "Hukum Ekonomi Syariah", value: 91 },
        { name: "Ilmu Hukum", value: 90 },
        { name: "Hukum Keluarga", value: 88 },
        { name: "Hukum Tata Negara", value: 86 },
        { name: "Perbandingan Madzhab", value: 84 },
        { name: "Hukum Pidana Islam", value: 83 },
      ],
      2023: [
        { name: "Hukum Ekonomi Syariah", value: 88 },
        { name: "Ilmu Hukum", value: 87 },
        { name: "Hukum Keluarga", value: 85 },
        { name: "Hukum Tata Negara", value: 83 },
        { name: "Perbandingan Madzhab", value: 81 },
        { name: "Hukum Pidana Islam", value: 80 },
      ],
      2022: [
        { name: "Hukum Ekonomi Syariah", value: 85 },
        { name: "Ilmu Hukum", value: 84 },
        { name: "Hukum Keluarga", value: 82 },
        { name: "Hukum Tata Negara", value: 80 },
        { name: "Perbandingan Madzhab", value: 78 },
        { name: "Hukum Pidana Islam", value: 77 },
      ],
    },
    "Dakwah dan Komunikasi": {
      2024: [
        { name: "Ilmu Komunikasi", value: 92 },
        { name: "Komunikasi Penyiaran Islam", value: 89 },
        { name: "Bimbingan dan Konseling Islam", value: 87 },
        { name: "Manajemen Dakwah", value: 85 },
        { name: "Pengembangan Masyarakat Islam", value: 83 },
      ],
      2023: [
        { name: "Ilmu Komunikasi", value: 89 },
        { name: "Komunikasi Penyiaran Islam", value: 86 },
        { name: "Bimbingan dan Konseling Islam", value: 84 },
        { name: "Manajemen Dakwah", value: 82 },
        { name: "Pengembangan Masyarakat Islam", value: 80 },
      ],
      2022: [
        { name: "Ilmu Komunikasi", value: 86 },
        { name: "Komunikasi Penyiaran Islam", value: 83 },
        { name: "Bimbingan dan Konseling Islam", value: 81 },
        { name: "Manajemen Dakwah", value: 79 },
        { name: "Pengembangan Masyarakat Islam", value: 77 },
      ],
    },
    "Adab dan Humaniora": {
      2024: [
        { name: "Sejarah Peradaban Islam", value: 86 },
        { name: "Bahasa dan Sastra Arab", value: 84 },
        { name: "Sastra Inggris", value: 82 },
      ],
      2023: [
        { name: "Sejarah Peradaban Islam", value: 83 },
        { name: "Bahasa dan Sastra Arab", value: 81 },
        { name: "Sastra Inggris", value: 79 },
      ],
      2022: [
        { name: "Sejarah Peradaban Islam", value: 80 },
        { name: "Bahasa dan Sastra Arab", value: 78 },
        { name: "Sastra Inggris", value: 76 },
      ],
    },
    "Ilmu Sosial dan Ilmu Politik": {
      2024: [
        { name: "Administrasi Publik", value: 88 },
        { name: "Sosiologi", value: 85 },
        { name: "Ilmu Politik", value: 83 },
      ],
      2023: [
        { name: "Administrasi Publik", value: 85 },
        { name: "Sosiologi", value: 82 },
        { name: "Ilmu Politik", value: 80 },
      ],
      2022: [
        { name: "Administrasi Publik", value: 82 },
        { name: "Sosiologi", value: 79 },
        { name: "Ilmu Politik", value: 77 },
      ],
    },
  };

  // Comprehensive payment percentage data for all faculties
  const paymentPercentageData = [
    // FST
    {
      jurusan: "Teknik Informatika",
      fakultas: "FST",
      2022: "90%",
      2023: "93%",
      2024: "95%",
    },
    {
      jurusan: "Matematika",
      fakultas: "FST",
      2022: "86%",
      2023: "89%",
      2024: "92%",
    },
    {
      jurusan: "Teknik Elektro",
      fakultas: "FST",
      2022: "89%",
      2023: "87%",
      2024: "89%",
    },
    {
      jurusan: "Agroteknologi",
      fakultas: "FST",
      2022: "87%",
      2023: "86%",
      2024: "88%",
    },
    {
      jurusan: "Biologi",
      fakultas: "FST",
      2022: "85%",
      2023: "84%",
      2024: "87%",
    },
    {
      jurusan: "Kimia",
      fakultas: "FST",
      2022: "80%",
      2023: "83%",
      2024: "86%",
    },
    {
      jurusan: "Fisika",
      fakultas: "FST",
      2022: "78%",
      2023: "81%",
      2024: "84%",
    },

    // Tarbiyah dan Keguruan
    {
      jurusan: "Pendidikan Agama Islam",
      fakultas: "Tarbiyah dan Keguruan",
      2022: "88%",
      2023: "91%",
      2024: "94%",
    },
    {
      jurusan: "PGMI",
      fakultas: "Tarbiyah dan Keguruan",
      2022: "87%",
      2023: "90%",
      2024: "93%",
    },
    {
      jurusan: "Manajemen Pendidikan Islam",
      fakultas: "Tarbiyah dan Keguruan",
      2022: "86%",
      2023: "89%",
      2024: "92%",
    },
    {
      jurusan: "Pendidikan Bahasa Inggris",
      fakultas: "Tarbiyah dan Keguruan",
      2022: "85%",
      2023: "88%",
      2024: "91%",
    },
    {
      jurusan: "PIAUD",
      fakultas: "Tarbiyah dan Keguruan",
      2022: "84%",
      2023: "87%",
      2024: "90%",
    },
    {
      jurusan: "Pendidikan Matematika",
      fakultas: "Tarbiyah dan Keguruan",
      2022: "83%",
      2023: "86%",
      2024: "89%",
    },
    {
      jurusan: "Pendidikan Biologi",
      fakultas: "Tarbiyah dan Keguruan",
      2022: "81%",
      2023: "84%",
      2024: "87%",
    },
    {
      jurusan: "Pendidikan Bahasa Arab",
      fakultas: "Tarbiyah dan Keguruan",
      2022: "79%",
      2023: "82%",
      2024: "85%",
    },
    {
      jurusan: "Pendidikan Kimia",
      fakultas: "Tarbiyah dan Keguruan",
      2022: "77%",
      2023: "80%",
      2024: "83%",
    },
    {
      jurusan: "Pendidikan Fisika",
      fakultas: "Tarbiyah dan Keguruan",
      2022: "75%",
      2023: "78%",
      2024: "81%",
    },

    // Ekonomi dan Bisnis Islam
    {
      jurusan: "Akutansi Syariah",
      fakultas: "Ekonomi dan Bisnis Islam",
      2022: "90%",
      2023: "93%",
      2024: "96%",
    },
    {
      jurusan: "Manajemen",
      fakultas: "Ekonomi dan Bisnis Islam",
      2022: "88%",
      2023: "91%",
      2024: "94%",
    },
    {
      jurusan: "Ekonomi Syariah",
      fakultas: "Ekonomi dan Bisnis Islam",
      2022: "87%",
      2023: "90%",
      2024: "93%",
    },
    {
      jurusan: "Manajemen Keuangan Syariah",
      fakultas: "Ekonomi dan Bisnis Islam",
      2022: "85%",
      2023: "88%",
      2024: "91%",
    },

    // Psikologi
    {
      jurusan: "Psikologi",
      fakultas: "Psikologi",
      2022: "87%",
      2023: "90%",
      2024: "93%",
    },

    // Ushuluddin
    {
      jurusan: "Ilmu al-Qur'an dan Tafsir",
      fakultas: "Ushuluddin",
      2022: "83%",
      2023: "86%",
      2024: "89%",
    },
    {
      jurusan: "Aqidah dan Filsafat Islam",
      fakultas: "Ushuluddin",
      2022: "81%",
      2023: "84%",
      2024: "87%",
    },
    {
      jurusan: "Studi Agama-Agama",
      fakultas: "Ushuluddin",
      2022: "79%",
      2023: "82%",
      2024: "85%",
    },
    {
      jurusan: "Tasawuf Psikoterapi",
      fakultas: "Ushuluddin",
      2022: "78%",
      2023: "81%",
      2024: "84%",
    },
    {
      jurusan: "Ilmu Hadits",
      fakultas: "Ushuluddin",
      2022: "76%",
      2023: "79%",
      2024: "82%",
    },

    // Syariah dan Hukum
    {
      jurusan: "Hukum Ekonomi Syariah",
      fakultas: "Syariah dan Hukum",
      2022: "85%",
      2023: "88%",
      2024: "91%",
    },
    {
      jurusan: "Ilmu Hukum",
      fakultas: "Syariah dan Hukum",
      2022: "84%",
      2023: "87%",
      2024: "90%",
    },
    {
      jurusan: "Hukum Keluarga",
      fakultas: "Syariah dan Hukum",
      2022: "82%",
      2023: "85%",
      2024: "88%",
    },
    {
      jurusan: "Hukum Tata Negara",
      fakultas: "Syariah dan Hukum",
      2022: "80%",
      2023: "83%",
      2024: "86%",
    },
    {
      jurusan: "Perbandingan Madzhab",
      fakultas: "Syariah dan Hukum",
      2022: "78%",
      2023: "81%",
      2024: "84%",
    },
    {
      jurusan: "Hukum Pidana Islam",
      fakultas: "Syariah dan Hukum",
      2022: "77%",
      2023: "80%",
      2024: "83%",
    },

    // Dakwah dan Komunikasi
    {
      jurusan: "Ilmu Komunikasi",
      fakultas: "Dakwah dan Komunikasi",
      2022: "86%",
      2023: "89%",
      2024: "92%",
    },
    {
      jurusan: "Komunikasi Penyiaran Islam",
      fakultas: "Dakwah dan Komunikasi",
      2022: "83%",
      2023: "86%",
      2024: "89%",
    },
    {
      jurusan: "Bimbingan dan Konseling Islam",
      fakultas: "Dakwah dan Komunikasi",
      2022: "81%",
      2023: "84%",
      2024: "87%",
    },
    {
      jurusan: "Manajemen Dakwah",
      fakultas: "Dakwah dan Komunikasi",
      2022: "79%",
      2023: "82%",
      2024: "85%",
    },
    {
      jurusan: "Pengembangan Masyarakat Islam",
      fakultas: "Dakwah dan Komunikasi",
      2022: "77%",
      2023: "80%",
      2024: "83%",
    },

    // Adab dan Humaniora
    {
      jurusan: "Sejarah Peradaban Islam",
      fakultas: "Adab dan Humaniora",
      2022: "80%",
      2023: "83%",
      2024: "86%",
    },
    {
      jurusan: "Bahasa dan Sastra Arab",
      fakultas: "Adab dan Humaniora",
      2022: "78%",
      2023: "81%",
      2024: "84%",
    },
    {
      jurusan: "Sastra Inggris",
      fakultas: "Adab dan Humaniora",
      2022: "76%",
      2023: "79%",
      2024: "82%",
    },

    // Ilmu Sosial dan Ilmu Politik
    {
      jurusan: "Administrasi Publik",
      fakultas: "Ilmu Sosial dan Ilmu Politik",
      2022: "82%",
      2023: "85%",
      2024: "88%",
    },
    {
      jurusan: "Sosiologi",
      fakultas: "Ilmu Sosial dan Ilmu Politik",
      2022: "79%",
      2023: "82%",
      2024: "85%",
    },
    {
      jurusan: "Ilmu Politik",
      fakultas: "Ilmu Sosial dan Ilmu Politik",
      2022: "77%",
      2023: "80%",
      2024: "83%",
    },
  ];

  // Comprehensive correlation data
  const correlationData = [
    // FST
    {
      jurusan: "Teknik Informatika",
      fakultas: "FST",
      percentage: "95%",
      avgIPK: "3.65",
      studentCount: 342,
    },
    {
      jurusan: "Matematika",
      fakultas: "FST",
      percentage: "92%",
      avgIPK: "3.55",
      studentCount: 195,
    },
    {
      jurusan: "Teknik Elektro",
      fakultas: "FST",
      percentage: "89%",
      avgIPK: "3.52",
      studentCount: 267,
    },
    {
      jurusan: "Agroteknologi",
      fakultas: "FST",
      percentage: "88%",
      avgIPK: "3.50",
      studentCount: 234,
    },
    {
      jurusan: "Biologi",
      fakultas: "FST",
      percentage: "87%",
      avgIPK: "3.48",
      studentCount: 278,
    },
    {
      jurusan: "Kimia",
      fakultas: "FST",
      percentage: "86%",
      avgIPK: "3.45",
      studentCount: 189,
    },
    {
      jurusan: "Fisika",
      fakultas: "FST",
      percentage: "84%",
      avgIPK: "3.42",
      studentCount: 156,
    },

    // Tarbiyah dan Keguruan
    {
      jurusan: "Pendidikan Agama Islam",
      fakultas: "Tarbiyah dan Keguruan",
      percentage: "94%",
      avgIPK: "3.62",
      studentCount: 456,
    },
    {
      jurusan: "PGMI",
      fakultas: "Tarbiyah dan Keguruan",
      percentage: "93%",
      avgIPK: "3.60",
      studentCount: 378,
    },
    {
      jurusan: "Manajemen Pendidikan Islam",
      fakultas: "Tarbiyah dan Keguruan",
      percentage: "92%",
      avgIPK: "3.58",
      studentCount: 245,
    },
    {
      jurusan: "Pendidikan Bahasa Inggris",
      fakultas: "Tarbiyah dan Keguruan",
      percentage: "91%",
      avgIPK: "3.56",
      studentCount: 289,
    },
    {
      jurusan: "PIAUD",
      fakultas: "Tarbiyah dan Keguruan",
      percentage: "90%",
      avgIPK: "3.54",
      studentCount: 312,
    },
    {
      jurusan: "Pendidikan Matematika",
      fakultas: "Tarbiyah dan Keguruan",
      percentage: "89%",
      avgIPK: "3.52",
      studentCount: 234,
    },
    {
      jurusan: "Pendidikan Biologi",
      fakultas: "Tarbiyah dan Keguruan",
      percentage: "87%",
      avgIPK: "3.48",
      studentCount: 198,
    },
    {
      jurusan: "Pendidikan Bahasa Arab",
      fakultas: "Tarbiyah dan Keguruan",
      percentage: "85%",
      avgIPK: "3.45",
      studentCount: 167,
    },
    {
      jurusan: "Pendidikan Kimia",
      fakultas: "Tarbiyah dan Keguruan",
      percentage: "83%",
      avgIPK: "3.42",
      studentCount: 145,
    },
    {
      jurusan: "Pendidikan Fisika",
      fakultas: "Tarbiyah dan Keguruan",
      percentage: "81%",
      avgIPK: "3.38",
      studentCount: 123,
    },

    // Ekonomi dan Bisnis Islam
    {
      jurusan: "Akutansi Syariah",
      fakultas: "Ekonomi dan Bisnis Islam",
      percentage: "96%",
      avgIPK: "3.68",
      studentCount: 345,
    },
    {
      jurusan: "Manajemen",
      fakultas: "Ekonomi dan Bisnis Islam",
      percentage: "94%",
      avgIPK: "3.63",
      studentCount: 398,
    },
    {
      jurusan: "Ekonomi Syariah",
      fakultas: "Ekonomi dan Bisnis Islam",
      percentage: "93%",
      avgIPK: "3.60",
      studentCount: 287,
    },
    {
      jurusan: "Manajemen Keuangan Syariah",
      fakultas: "Ekonomi dan Bisnis Islam",
      percentage: "91%",
      avgIPK: "3.57",
      studentCount: 234,
    },

    // Psikologi
    {
      jurusan: "Psikologi",
      fakultas: "Psikologi",
      percentage: "93%",
      avgIPK: "3.59",
      studentCount: 298,
    },

    // Ushuluddin
    {
      jurusan: "Ilmu al-Qur'an dan Tafsir",
      fakultas: "Ushuluddin",
      percentage: "89%",
      avgIPK: "3.51",
      studentCount: 178,
    },
    {
      jurusan: "Aqidah dan Filsafat Islam",
      fakultas: "Ushuluddin",
      percentage: "87%",
      avgIPK: "3.47",
      studentCount: 156,
    },
    {
      jurusan: "Studi Agama-Agama",
      fakultas: "Ushuluddin",
      percentage: "85%",
      avgIPK: "3.44",
      studentCount: 134,
    },
    {
      jurusan: "Tasawuf Psikoterapi",
      fakultas: "Ushuluddin",
      percentage: "84%",
      avgIPK: "3.42",
      studentCount: 112,
    },
    {
      jurusan: "Ilmu Hadits",
      fakultas: "Ushuluddin",
      percentage: "82%",
      avgIPK: "3.39",
      studentCount: 98,
    },

    // Syariah dan Hukum
    {
      jurusan: "Hukum Ekonomi Syariah",
      fakultas: "Syariah dan Hukum",
      percentage: "91%",
      avgIPK: "3.56",
      studentCount: 245,
    },
    {
      jurusan: "Ilmu Hukum",
      fakultas: "Syariah dan Hukum",
      percentage: "90%",
      avgIPK: "3.54",
      studentCount: 289,
    },
    {
      jurusan: "Hukum Keluarga",
      fakultas: "Syariah dan Hukum",
      percentage: "88%",
      avgIPK: "3.50",
      studentCount: 198,
    },
    {
      jurusan: "Hukum Tata Negara",
      fakultas: "Syariah dan Hukum",
      percentage: "86%",
      avgIPK: "3.46",
      studentCount: 167,
    },
    {
      jurusan: "Perbandingan Madzhab",
      fakultas: "Syariah dan Hukum",
      percentage: "84%",
      avgIPK: "3.43",
      studentCount: 145,
    },
    {
      jurusan: "Hukum Pidana Islam",
      fakultas: "Syariah dan Hukum",
      percentage: "83%",
      avgIPK: "3.41",
      studentCount: 123,
    },

    // Dakwah dan Komunikasi
    {
      jurusan: "Ilmu Komunikasi",
      fakultas: "Dakwah dan Komunikasi",
      percentage: "92%",
      avgIPK: "3.57",
      studentCount: 298,
    },
    {
      jurusan: "Komunikasi Penyiaran Islam",
      fakultas: "Dakwah dan Komunikasi",
      percentage: "89%",
      avgIPK: "3.51",
      studentCount: 234,
    },
    {
      jurusan: "Bimbingan dan Konseling Islam",
      fakultas: "Dakwah dan Komunikasi",
      percentage: "87%",
      avgIPK: "3.48",
      studentCount: 189,
    },
    {
      jurusan: "Manajemen Dakwah",
      fakultas: "Dakwah dan Komunikasi",
      percentage: "85%",
      avgIPK: "3.44",
      studentCount: 156,
    },
    {
      jurusan: "Pengembangan Masyarakat Islam",
      fakultas: "Dakwah dan Komunikasi",
      percentage: "83%",
      avgIPK: "3.41",
      studentCount: 134,
    },

    // Adab dan Humaniora
    {
      jurusan: "Sejarah Peradaban Islam",
      fakultas: "Adab dan Humaniora",
      percentage: "86%",
      avgIPK: "3.46",
      studentCount: 145,
    },
    {
      jurusan: "Bahasa dan Sastra Arab",
      fakultas: "Adab dan Humaniora",
      percentage: "84%",
      avgIPK: "3.43",
      studentCount: 123,
    },
    {
      jurusan: "Sastra Inggris",
      fakultas: "Adab dan Humaniora",
      percentage: "82%",
      avgIPK: "3.40",
      studentCount: 98,
    },

    // Ilmu Sosial dan Ilmu Politik
    {
      jurusan: "Administrasi Publik",
      fakultas: "Ilmu Sosial dan Ilmu Politik",
      percentage: "88%",
      avgIPK: "3.49",
      studentCount: 198,
    },
    {
      jurusan: "Sosiologi",
      fakultas: "Ilmu Sosial dan Ilmu Politik",
      percentage: "85%",
      avgIPK: "3.45",
      studentCount: 167,
    },
    {
      jurusan: "Ilmu Politik",
      fakultas: "Ilmu Sosial dan Ilmu Politik",
      percentage: "83%",
      avgIPK: "3.42",
      studentCount: 134,
    },
  ];

  const handleFakultasChange = (e) => {
    setSelectedFakultas(e.target.value);
  };

  // Filter data based on selected faculty
  const getFilteredData = (data, fakultasFilter) => {
    let filtered = data;

    if (fakultasFilter !== "Semua") {
      filtered = filtered.filter((item) => item.fakultas === fakultasFilter);
    }

    return filtered;
  };

  // Get chart data based on selected faculty and year
  const getChartData = () => {
    const facultyKey =
      selectedFakultas === "Semua" ? "Semua" : selectedFakultas;
    return (
      chartDataByFakultas[facultyKey]?.[selectedYear] ||
      chartDataByFakultas["Semua"][selectedYear]
    );
  };

  const filteredPaymentData = getFilteredData(
    paymentPercentageData,
    selectedFakultas
  );
  const filteredCorrelationData = getFilteredData(
    correlationData,
    selectedFakultas
  );

  return (
    <div className="dashboard-layout">
      <Sidebar isLoggedIn={true} userRole="eksekutif" onLogout={onLogout} />

      <div className="dashboard-content">
        <Header isLoggedIn={true} user="eksekutif" onLogout={onLogout} />

        <main className="dashboard-main">
          <div style={{ marginBottom: "30px" }}>
            <h1 className="dashboard-title">Pembayaran UKT</h1>

            {/* Filter Controls */}
            <div
              style={{
                display: "flex",
                gap: "20px",
                marginBottom: "30px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    color: "#ccc",
                    fontSize: "14px",
                  }}
                >
                  Tahun:
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#333",
                    color: "white",
                    border: "1px solid #555",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    color: "#ccc",
                    fontSize: "14px",
                  }}
                >
                  Fakultas:
                </label>
                <select
                  value={selectedFakultas}
                  onChange={handleFakultasChange}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#333",
                    color: "white",
                    border: "1px solid #555",
                    borderRadius: "4px",
                    fontSize: "14px",
                    minWidth: "200px",
                  }}
                >
                  {fakultasOptions.map((fakultas) => (
                    <option key={fakultas} value={fakultas}>
                      {fakultas}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div
            style={{
              backgroundColor: "#2a2a2a",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "30px",
              border: "1px solid #444",
            }}
          >
            <h3
              style={{
                marginBottom: "20px",
                textAlign: "center",
                color: "white",
                fontSize: "18px",
              }}
            >
              Persentase Pembayaran UKT Tahun {selectedYear} -{" "}
              {selectedFakultas}
            </h3>
            <div style={{ height: "400px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getChartData()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#ffffff", fontSize: 10 }}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    interval={0}
                  />
                  <YAxis
                    tick={{ fill: "#ffffff" }}
                    domain={[0, 100]}
                    label={{
                      value: "Persentase (%)",
                      angle: -90,
                      position: "insideLeft",
                      style: { textAnchor: "middle", fill: "#ffffff" },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#333",
                      border: "1px solid #555",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    formatter={(value) => [
                      `${value}%`,
                      "Persentase Pembayaran",
                    ]}
                  />
                  <Bar dataKey="value" fill="#4A90E2" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tables Section */}
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {/* Payment Percentage Table */}
            <div
              style={{
                backgroundColor: "#2a2a2a",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #444",
                flex: 1,
                minWidth: "400px",
              }}
            >
              <h3
                style={{
                  marginBottom: "20px",
                  color: "white",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                Persentase Pembayaran UKT Per Jurusan (2022-2024)
              </h3>
              <div
                style={{
                  overflowX: "auto",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                  }}
                >
                  <thead
                    style={{
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#333",
                    }}
                  >
                    <tr>
                      <th
                        style={{
                          padding: "12px 8px",
                          textAlign: "left",
                          borderBottom: "1px solid #555",
                          color: "white",
                        }}
                      >
                        Jurusan
                      </th>
                      <th
                        style={{
                          padding: "12px 8px",
                          textAlign: "center",
                          borderBottom: "1px solid #555",
                          color: "white",
                        }}
                      >
                        2022
                      </th>
                      <th
                        style={{
                          padding: "12px 8px",
                          textAlign: "center",
                          borderBottom: "1px solid #555",
                          color: "white",
                        }}
                      >
                        2023
                      </th>
                      <th
                        style={{
                          padding: "12px 8px",
                          textAlign: "center",
                          borderBottom: "1px solid #555",
                          color: "white",
                        }}
                      >
                        2024
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPaymentData.map((row, index) => (
                      <tr
                        key={index}
                        style={{
                          backgroundColor: index % 2 === 0 ? "#2a2a2a" : "#333",
                        }}
                      >
                        <td
                          style={{
                            padding: "10px 8px",
                            borderBottom: "1px solid #444",
                            color: "white",
                          }}
                        >
                          {row.jurusan}
                        </td>
                        <td
                          style={{
                            padding: "10px 8px",
                            textAlign: "center",
                            borderBottom: "1px solid #444",
                            color: "white",
                          }}
                        >
                          {row[2022]}
                        </td>
                        <td
                          style={{
                            padding: "10px 8px",
                            textAlign: "center",
                            borderBottom: "1px solid #444",
                            color: "white",
                          }}
                        >
                          {row[2023]}
                        </td>
                        <td
                          style={{
                            padding: "10px 8px",
                            textAlign: "center",
                            borderBottom: "1px solid #444",
                            color: "white",
                          }}
                        >
                          {row[2024]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Correlation Table */}
            <div
              style={{
                backgroundColor: "#2a2a2a",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #444",
                flex: 1,
                minWidth: "400px",
              }}
            >
              <h3
                style={{
                  marginBottom: "20px",
                  color: "white",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                Korelasi Pembayaran UKT dengan IPK & Jumlah Mahasiswa
              </h3>
              <div
                style={{
                  overflowX: "auto",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                  }}
                >
                  <thead
                    style={{
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#333",
                    }}
                  >
                    <tr>
                      <th
                        style={{
                          padding: "12px 8px",
                          textAlign: "left",
                          borderBottom: "1px solid #555",
                          color: "white",
                        }}
                      >
                        Jurusan
                      </th>
                      <th
                        style={{
                          padding: "12px 8px",
                          textAlign: "center",
                          borderBottom: "1px solid #555",
                          color: "white",
                        }}
                      >
                        % Bayar
                      </th>
                      <th
                        style={{
                          padding: "12px 8px",
                          textAlign: "center",
                          borderBottom: "1px solid #555",
                          color: "white",
                        }}
                      >
                        IPK Rata-rata
                      </th>
                      <th
                        style={{
                          padding: "12px 8px",
                          textAlign: "center",
                          borderBottom: "1px solid #555",
                          color: "white",
                        }}
                      >
                        Jml Mhs
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCorrelationData
                      .sort(
                        (a, b) =>
                          parseInt(b.percentage) - parseInt(a.percentage)
                      )
                      .map((row, index) => (
                        <tr
                          key={index}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#2a2a2a" : "#333",
                          }}
                        >
                          <td
                            style={{
                              padding: "10px 8px",
                              borderBottom: "1px solid #444",
                              color: "white",
                            }}
                          >
                            {row.jurusan}
                          </td>
                          <td
                            style={{
                              padding: "10px 8px",
                              textAlign: "center",
                              borderBottom: "1px solid #444",
                              color: "white",
                            }}
                          >
                            {row.percentage}
                          </td>
                          <td
                            style={{
                              padding: "10px 8px",
                              textAlign: "center",
                              borderBottom: "1px solid #444",
                              color: "white",
                            }}
                          >
                            {row.avgIPK}
                          </td>
                          <td
                            style={{
                              padding: "10px 8px",
                              textAlign: "center",
                              borderBottom: "1px solid #444",
                              color: "white",
                            }}
                          >
                            {row.studentCount}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>

        <Footer isLoggedIn={true} />
      </div>
    </div>
  );
};

export default PembayaranUKT;
