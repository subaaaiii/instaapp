import { useState } from "react";

type CreatePostData = {
  caption: string;
};

export default function PostContent({caption}:CreatePostData) {
  const [expanded, setExpanded] = useState(false);

  const text = `🌱 WE ARE HIRING: PROGRAMMER! 🌱

Direktorat Pencegahan Dampak Lingkungan Usaha dan Kegiatan - Kementerian Lingkungan Hidup/BPLH membuka kesempatan berkarier bagi kamu yang passionate di dunia teknologi dan ingin berkontribusi untuk lingkungan hidup Indonesia! 💻🌏

📌 Posisi
• Programmer

📌 Penempatan
• Jakarta Selatan & Bogor

📌 Mulai Bekerja
• Agustus 2026

✅ Persyaratan
1. Minimal D3 Teknik Informatika, Sistem Informasi, Ilmu Komputer, RPL, atau bidang terkait.
2. Fresh graduate maupun berpengalaman 1–3 tahun sebagai Software Engineer / Programmer.
3. Menguasai Laravel (PHP 8.x), Vue.js (2/3), RESTful API, dan PostgreSQL.
4. Memahami Clean Code serta Git/GitLab.
5. Nilai tambah apabila menguasai Nuxt.js, MongoDB, Docker, CI/CD, Redis, Golang, dan Quasar Framework.

📩 Cara Melamar
Kirim:
• CV
• Portfolio
• Ijazah Terakhir
• Transkrip Nilai
• Surat Lamaran (cantumkan ekspektasi gaji)
• Hasil Technical Test / Assessment

Ke:
📧 amdalnet.ops@kemenlh.go.id

Subject:
Recruitment Programmer_Nama

📝 Technical Test
s.kemenlh.go.id/technical-test-pdluk

⏰ Deadline
2 Agustus 2026 • 23.59 WIB

🇮🇩 Yuk, jadi bagian dari tim yang mendukung pelestarian lingkungan hidup Indonesia melalui teknologi!

#Loker #LowonganKerja #Programmer #JobVacancy
#Laravel #VueJS #FreshGraduate #ITJobs #Jakarta #Bogor`;

  return (
    <div>
      

      <p
        className={`mt-1 whitespace-pre-wrap break-words ${
          !expanded && "line-clamp-3"
        }`}
      >
        <span className="font-semibold">Subairi </span>
        {caption}
      </p>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-2 text-sm font-medium text-gray-500 hover:underline"
      >
        {expanded ? "Show less" : "See more"}
      </button>
    </div>
  );
}
