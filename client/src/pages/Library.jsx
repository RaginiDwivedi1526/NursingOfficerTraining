import React from 'react';
import { BookOpen, FolderOpen, ArrowRight, BookMarked, Download } from 'lucide-react';

const LIBRARY_LINKS = [
  { title: "Anatomy & Physiology", url: "https://drive.google.com/drive/folders/1PkJlfMjD4-tq-9FxVxR4eIJScLh_ojqL?usp=drive_link" },
  { title: "Biochemistry", url: "https://drive.google.com/drive/folders/1l1oq50ujn-f4_bkZcLu4TYYeaVILl1xC?usp=drive_link" },
  { title: "Biophysics", url: "https://drive.google.com/drive/folders/1cjeBnFw5sYv3UMnmphkqGkfZiHNGD3aF" },
  { title: "Child Health Nursing", url: "https://drive.google.com/drive/folders/1Htp0zzsIQElilh8OVFYT06sf62z_i6op?usp=drive_link" },
  { title: "Communication & Educational Technology", url: "https://drive.google.com/drive/folders/1b5xLWNOccbbzd74DZdzG0bUmcRW9Enbi?usp=drive_link" },
  { title: "Community Health Nursing", url: "https://drive.google.com/drive/folders/135bWRioxZHHvkO7YMsZIK-O-vspY7VFK?usp=drive_link" },
  { title: "English", url: "https://drive.google.com/drive/folders/1AUYRG_1O9HOC2c-MZwPkXsmqcC3W2kU1?usp=drive_link" },
  { title: "Embryology", url: "https://drive.google.com/drive/folders/1KehqMYw3gPs4y76yKvO4cx0Zxmv32UzA?usp=drive_link" },
  { title: "Forensic Nursing", url: "https://drive.google.com/drive/folders/18EtVjHb1fcaNY_p-TPtqGPSWU0j2rM0p" },
  { title: "Genetics", url: "https://drive.google.com/drive/folders/1dkYuYeUKxswdWIdfc8Dy-2_o55SMpJ0Q?usp=drive_link" },
  { title: "Management of Nursing Services & Education", url: "https://drive.google.com/drive/folders/1rAGxFkcZJo-oAIX89swhoXG085OQQ690?usp=drive_link" },
  { title: "Medical Surgical Nursing Adult Health Nursing", url: "https://drive.google.com/drive/folders/1dW701IG4ccTPI7QIRjpR97CmOZdELjiZ?usp=drive_link" },
  { title: "Mental Health/Psychiatric Nursing", url: "https://drive.google.com/drive/folders/1dpEroFFYA4zMCRdXft_5d6UPoMInuYw1?usp=drive_link" },
  { title: "Microbiology", url: "https://drive.google.com/drive/folders/10f7FVEo8ixiEqOce8C2e4z7TUwSANsUw?usp=drive_link" },
  { title: "Midwifery and Obstetrical Nursing", url: "https://drive.google.com/drive/folders/1xnOxVQlHwO6MVi94LTN8w8kmETPQG-FH?usp=drive_link" },
  { title: "Modules", url: "https://drive.google.com/drive/folders/1-POJX058i8YIuTbYa6i3jx7kmyNhzlPd" },
  { title: "Nursing Foundations", url: "https://drive.google.com/drive/folders/1WcEobdUASnvpDt7TedPEX1l0lSEPIb6Z?usp=drive_link" },
  { title: "Nursing Research", url: "https://drive.google.com/drive/folders/17QiiBozdsi495rS8oKPmBDJGRh4fokgU?usp=drive_link" },
  { title: "Nutrition", url: "https://drive.google.com/drive/folders/1JAPGrWZyYeFkKAt9pJ6d4Ws6VzWMZugH?usp=drive_link" },
  { title: "OSCE OSPE", url: "https://drive.google.com/drive/folders/1QXq2oi3R-4e9THgfEeU6di4JJ7vB98G0" },
  { title: "Pathology", url: "https://drive.google.com/drive/folders/1taZgFNTaiyMpvqMGg4raC4_iETEvVjBq?usp=drive_link" },
  { title: "Pharmacology", url: "https://drive.google.com/drive/folders/1-7K_1bh6pjE4O5wtGCfRQ9GUGfE9uTcP?usp=drive_link" },
  { title: "Psychology", url: "https://drive.google.com/drive/folders/1LkhfYFlAVWHaJz1kreZB_nDhkw09Txbu?usp=drive_link" },
  { title: "Physiology", url: "https://drive.google.com/drive/folders/1RLhIAHmaWi6JceFiK2UIsxB2jObAGY3U?usp=drive_link" },
  { title: "Sociology", url: "https://drive.google.com/drive/folders/1QKAo9gP6ezWCwvq2OwZwpe8AzLjUcQ-n?usp=drive_link" },
  { title: "Statistics", url: "https://drive.google.com/drive/folders/1zTUhO7uAt6qjIOyH7x6ml1eXnEXEKyyGn?usp=drive_link" },
  { title: "Syllabus Nursing", url: "https://drive.google.com/drive/folders/1jA2f58pmK3nGPUavsAc_lmN_44Uhbwm" }
];

const Library = () => {
  return (
    <div className="library-page page-container">
      <div className="library-header-banner">
        <div className="library-header-content">
          <div className="library-badge">
            <BookMarked size={16} />
            Study Materials
          </div>
          <h1>Nursing E-Library</h1>
          <p>Access our comprehensive collection of nursing modules, syllabus guidelines, and study materials organized by subject.</p>
        </div>
        <div className="library-header-icon">
          <BookOpen size={80} />
        </div>
      </div>

      <div className="library-main-content">
        <div className="library-grid">
          {LIBRARY_LINKS.map((item, index) => (
            <a 
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="library-card"
            >
              <div className="library-card-icon">
                <FolderOpen size={24} />
              </div>
              <div className="library-card-content">
                <h3>{item.title}</h3>
                <span className="library-card-link">
                  Open Drive <ArrowRight size={14} className="arrow-icon" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
