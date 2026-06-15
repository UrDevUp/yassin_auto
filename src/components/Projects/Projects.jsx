import "./Projects.css";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "قطع الكهرباء",
      description: "أجود قطع كهربائية للسيارات بأسعار منافسة",
      image:
        "https://images.unsplash.com/photo-1486481153911-ea5292601ccb?w=400&q=80",
    },
    {
      id: 2,
      title: "قطع الميكانيك",
      description: "قطع ميكانيكية أصلية وموثوقة",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&q=80",
    },
    {
      id: 3,
      title: "قطع الدفاعات",
      description: "دفاعات عالية الجودة لكل أنواع السيارات",
      image:
        "https://images.unsplash.com/photo-1494145904049-0dca7b0589b0?w=400&q=80",
    },
  ];

  return (
    <section id="products" className="projects">
      <div className="projects__container">
        <h2 className="projects__title">منتجاتنا</h2>
        <p className="projects__subtitle">أفضل القطع الغيار بأسعار منافسة</p>

        <div className="projects__grid">
          {projects.map((project) => (
            <div key={project.id} className="projects__card">
              <img
                src={project.image}
                alt={project.title}
                className="projects__card-image"
              />
              <div className="projects__card-content">
                <h3 className="projects__card-title">{project.title}</h3>
                <p className="projects__card-desc">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
